define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    var validate = require('validate');

    require('lodash');
    require('zTree');
    require('excheck');
    require('exhide');
    // 模板
    var tpls = {
        index: require('../../tpl/roleManager/index'),
        list: require('../../tpl/roleManager/list'),
        editRole: require('../../tpl/roleManager/editRole')
    };

    function roleList() {}
    $.extend(roleList.prototype, {
        init: function(param) {
            // 初始化查询条件参数
            this.getParams(param);
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.index)({ searchValue: this.searchParam }));
            this.event();
            // 获取数据
            this.getData();
        },
        getData: function() {
            var me = this;
            var param = this.searchParam;
            param = $.extend({}, param, this.sortParam ? this.sortParam : {});
            common.loading('show');
            common.ajax(api.roleManager.list, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    $('#rolelist > table > tbody').empty().html(template.compile(tpls.list)({
                        data: data.Page || []
                    }));
                    common.page(data.TotalCount, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.pageNumber = currPage;
                        common.changeHash('#roleManager/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || 'System error, please contact the administrator!';
                    common.layMsg(msg);
                }
                common.loading();
            });
            //}
        },
        // 获取查询条件
        getParams: function(param, reset) {
            param = param || {};
            reset = reset || false;
            this.sortParam = {};
            var _param = null;
            if (reset || param.back) {
                _param = {
                    RoleName: ''
                }
            } else {
                if (param && _.isEmpty(param)) {
                    _param = {
                        RoleName: common.getElValue('input[name="RoleName"]')
                    }
                } else {
                    _param = param;
                }
            }
            this.searchParam = common.getParams(null, true, _param);
        },
        editRoleLayer: function(id) {
            var me = this;
            id = id || null;
            var title = id ? 'Add' : 'Edit';
            common.layUI({
                title: title,
                area: '900px',
                btn: [],
                content: template.compile(tpls.editRole)({ data: {} }),
                success: function(el) {
                    me.initOrgTree(id, function() {
                        if (id) {
                            me.initEditValue(id); //初始化表单
                        }
                        me.validate(id); //验证
                        $(el).find('.js_add_cancel').on('click', function() {
                            layer.closeAll();
                        });
                    });
                }
            });
        },
        event: function() {
            var me = this;

            // 查询-事件监听
            $('.panel-toolbar').on('click', '.js_search', function(event) {
                me.getParams();
                common.changeHash('#roleManager/index/', me.searchParam);
            }).on('click', '.js_list_reset', function() {
                common.removeLocationStorage('roleManagerSearchParams'); // 投诉管理
                me.getParams(null, true);
                common.changeHash('#roleManager/index/', me.searchParam);
            });
            // 事件监听
            $('#main-content').off()
                .on('click', '.js_list_add', function() {
                    me.editRoleLayer();
                })
                .on('click', '.js_list_edit', function() {
                    var tr = $(this).closest('tr');
                    var id = tr.data('id');
                    me.editRoleLayer(id);
                })
                //删除角色
                .on('click', '.js_list_delete', function() {
                    var id = $(this).closest('tr').data('id');
                    var confirmText = 'Sure to delete this user?';
                    me.deleteRole(id, confirmText);
                });
        },
        //初始化树
        initOrgTree: function(id, callback) {
            var me = this;
            //组织列表树设置
            var ztreeSetting = {
                check: {
                    enable: true,
                    chkStyle: "checkbox"
                },
                view: {
                    selectedMulti: false
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "KeyId",
                        pIdKey: "ParentId",
                        rootPId: null
                    },
                    key: {
                        name: "Name",
                        children: "children",
                        checked: "Selected"
                    }
                },
                callback: {
                    onClick: function(event, treeId, treeNode) {
                        var treeObj = $.fn.zTree.getZTreeObj(treeId);
                        treeObj.checkNode(treeNode, !treeNode.checked, true);
                    }
                }
            };
            var $treeContainer = $("#vehicleTree");
            $treeContainer.html('Requesting data ...');

            common.ajax(api.roleManager.rolePermission, {}, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var data = res.content || [];
                    if (!res.content || (res.content && !res.content.length)) {
                        $treeContainer.html('Data not found');
                        typeof callback === 'function' && callback();
                        return;
                    }
                    $.fn.zTree.init($treeContainer, ztreeSetting, data);
                    var treeObj = $.fn.zTree.getZTreeObj("vehicleTree");
                    //展开节点
                    if (!id) {
                        var treeObj = $.fn.zTree.getZTreeObj("vehicleTree");
                        treeObj.expandAll(true);
                    }
                    typeof callback === 'function' && callback();
                } else {
                    var msg = res.errorMsg || 'System error, please contact the administrator!';
                    common.layMsg(msg);
                }
            });
        },
        // 初始化表单
        initEditValue: function(id) {
            var me = this;
            var url = api.roleManager.roleDetail;

            //树上回显已经分配的资源
            var treeObj = $.fn.zTree.getZTreeObj("vehicleTree");

            if (treeObj == null) return;

            treeObj.expandAll(false); //默认收起全部节点
            treeObj.checkAllNodes(false); //取消所有勾选的节点
            //发起请求
            common.ajax(url, { RoleId: id }, function(res) {
                var content = res.content,
                    nodess = treeObj.getNodes(),
                    resourceIdArr = content.AllRight || [];
                //给表单赋值
                common.setFormData($('#frmaddRole'), content);
                //给权限树赋值回显
                if (nodess == null || (nodess != null && nodess.length == 0)) return;
                //根据该角色已有的权限进行相应节点的选中操作
                for (var i = 0, len = nodess.length; i < len; i++) {
                    for (var j = 0, lenj = resourceIdArr.length; j < lenj; j++) {
                        var getNodeByParam = treeObj.getNodeByParam("RightNo", resourceIdArr[j], null);
                        if (getNodeByParam && getNodeByParam != null) {
                            treeObj.checkNode(getNodeByParam, true, false);
                        }
                    }
                    //treeObj.setChkDisabled(nodess[i], true,true,true);
                };
                treeObj.expandAll(true); //默认展开全部节点
            });
        },
        validate: function(id) {
            var me = this;
            validate('#frmaddRole', {
                subBtn: '.js_add_save',
                promptPos: 'inline',
                submit: function() {
                    me.submitForm(id);
                }
            });
        },
        submitForm: function(id) {
            var me = this;
            var url = id ? api.roleManager.editRole : api.roleManager.createRole;

            var params = common.getFormData('#frmaddRole');
            var treeObj = $.fn.zTree.getZTreeObj("vehicleTree");
            var nodes = [];
            if (treeObj != null) {
                nodes = treeObj.getCheckedNodes(true);
            }
            var arr = [];
            for (var i = 0, len = nodes.length; i < len; i++) {
                arr.push(nodes[i].RightNo);
            };
            if (id) {
                params.RoleId = id;
            }
            params.Permission = arr.toString();

            common.loading('show');
            common.ajax(url, params, function(res) {
                if (res && res.status === 'SUCCESS') {
                    common.layMsg('SUCCESS', 'success');
                    me.getData();
                } else {
                    var msg = res.errorMsg ? res.errorMsg : 'Server problem, please try again later';
                    common.layMsg(msg);
                }
                common.loading();
            });
        },
        //删除角色
        deleteRole: function(id, confirmText, callback) {
            var me = this;
            common.layConfirm(confirmText, function() {
                common.loading('show', 'Data processing…');
                common.ajax(api.roleManager.deleteRole, {
                    RoleIds: id
                }, function(res) {
                    if (res.status === 'SUCCESS') {
                        if (callback) {
                            callback();
                        } else {
                            me.getData();
                        }
                    } else {
                        var msg = res.errorMsg || '请求数据失败，请联系管理员！';
                        common.layMsg(msg);
                    }
                    common.loading();
                });
            });
        }
    });

    var _roleObj = new roleList();

    exports.init = function(param) {
        _roleObj.init(param);
    };
});