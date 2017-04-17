define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    var map = require('map');
    var validate = require('validate');

    require('lodash');
    require('zTree');
    require('excheck');
    require('exhide');
    // 模板
    var tpls = {
        index: require('../../tpl/seatsManager/index'),
        list: require('../../tpl/seatsManager/list'),
        editSeats: require('../../tpl/seatsManager/editSeats')
    };

    function seatsList() {}
    $.extend(seatsList.prototype, {
        init: function(param) {
            // 初始化查询条件参数
            this.getParams(param);
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.index)());
            // 获取数据
            this.getData();
        },
        // 获取查询条件
        getParams: function(param) {
            this.searchParam = common.getParams('seatsManagerSearchParams');
        },
        getData: function() {
            var me = this;
            var param = this.searchParam;
            param = $.extend({}, param, this.sortParam ? this.sortParam : {});
            // 将查询条件保存到localStorage里面
            common.setlocationStorage('seatsManagerSearchParams', JSON.stringify(this.searchParam));
            common.loading('show');
            common.ajax(api.seatsManager.list, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    $('#seatList > table > tbody').empty().html(template.compile(tpls.list)({
                        data: data.Page || []
                    }));
                    common.page(data.TotalCount, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.pageNumber = currPage;
                        common.changeHash('#orderManager/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
                common.loading();
            });
        },
        event: function() {
            var me = this;
            // 事件监听
            $('#main-content').off().on('click', '.js_list_add', function() {
                    common.changeHash('#carManager/edit');
                })
                //编辑
                .on('click', '.js_list_edit', function() {
                    var tr = $(this).closest('tr');
                    var id = tr.data('truckid');

                    common.autoAdaptionDialog(template.compile(tpls.editSeats)(), {
                        title: '编辑座席'
                    }, function(_dialog) {
                        me.initOrgTree(function() {
                            me.initEditValue(id);
                            me.validate(_dialog, id);
                            $('#frmSeat .js_cancel').on('click', function() {
                                _dialog.close();
                            });
                        });
                    });
                })
                //停用、启用
                .on('click', '.js_list_setStatus', function() {
                    var tr = $(this).closest('tr');
                    var id = tr.data('truckid');
                    var status = tr.data('status') == 1 ? 0 : 1; //0:禁用  1：启用

                    common.confirm('确定' + (status == 1 ? '启用' : '停用') + '此座席信息？', function() {
                        me._opStatus(id, status);
                    });
                });
        },
        // 初始化表单
        initEditValue: function(id) {
            var me = this;
            var url = api.seatsManager.detail;

            //树上回显已经分配的资源
            var treeObj = $.fn.zTree.getZTreeObj("vehicleTree");

            if (treeObj == null) return;

            treeObj.expandAll(false); //默认收起全部节点
            treeObj.checkAllNodes(false); //取消所有勾选的节点
            //发起请求
            common.loading('show');
            common.ajax(url, { id: id }, function(res) {
                var content = res.content,
                    nodess = treeObj.getNodes(),
                    resourceIdArr = (content.Vids && content.Vids.split(',')) || [];
                //给表单赋值
                common.setFormData($('#frmSeat'), content);
                $('#js_editSeats_no').text(content.Id);
                //给权限树赋值回显
                if (nodess == null || (nodess != null && nodess.length == 0)) return;
                //根据该角色已有的权限进行相应节点的选中操作
                for (var i = 0, len = nodess.length; i < len; i++) {
                    for (var j = 0, lenj = resourceIdArr.length; j < lenj; j++) {
                        var getNodeByParam = treeObj.getNodeByParam("Id", resourceIdArr[j], null);
                        if (getNodeByParam && getNodeByParam != null) {
                            treeObj.checkNode(getNodeByParam, true, false);
                        }
                    }
                };
                treeObj.expandAll(true); //默认展开全部节点
                common.loading();
            });
        },
        //初始化树
        initOrgTree: function(callback) {
            var me = this;

            //组织列表树设置
            var ztreeSetting = {
                check: {
                    enable: true,
                    chkStyle: "checkbox"
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "Id",
                        pIdKey: "Pid",
                        rootPId: null
                    },
                    key: {
                        name: "Name",
                        children: "children",
                        checked: "IsCheck"
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
            $treeContainer.html('正在请求数据...');

            common.ajax(api.vehicleList, {}, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var data = res.content || [];
                    if (!data.length) {
                        $treeContainer.html('未查询到相关数据');
                        typeof callback === 'function' && callback();
                        return;
                    }
                    $.fn.zTree.init($treeContainer, ztreeSetting, data);
                    typeof callback === 'function' && callback();
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.layMsg(msg);
                }
            });
        },
        validate: function(_dialog, id) {
            var me = this;
            validate('#frmSeat', {
                subBtn: '.js_save',
                promptPos: 'inline',
                submit: function() {
                    me.submitForm(_dialog, id);
                },
                reg: {
                    'ipaddress': /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/
                },
                errorMsg: {
                    'ipaddress': '请输入正确的ip地址'
                }
            });
        },
        submitForm: function(dialogObj, id) {
            var me = this;
            var url = api.seatsManager.update;

            var params = common.getFormData('#frmSeat');
            var treeObj = $.fn.zTree.getZTreeObj("vehicleTree");
            var nodes = [];
            if (treeObj != null) {
                nodes = treeObj.getCheckedNodes(true);
            }
            var arr = [];
            for (var i = 0, len = nodes.length; i < len; i++) {
                arr.push(nodes[i].Id);
            };
            params.Vids = arr.toString();
            params.Id = id;

            common.loading('show');
            common.ajax(url, params, function(res) {
                common.loading();
                if (res && res.status === 'SUCCESS') {
                    dialogObj.close();
                    common.layMsg('数据操作成功', 'success');
                    me.getData();
                } else {
                    var msg = res.errorMsg ? res.errorMsg : '服务器问题，请稍后重试';
                    common.layAlert(msg, 'error');
                }
            });
        },
        //停用、启用坐席信息
        _opStatus: function(id, status) {
            var me = this;

            common.loading('show');
            common.ajax(api.seatsManager.changeStatus, {
                Id: id,
                Status: status
            }, function(data) {
                common.loading();
                if (data.status == 'SUCCESS') {
                    common.layMsg('成功' + (status == 1 ? '启用' : '停用') + '座席信息');
                    me.init();
                } else {
                    var msg = res.errorMsg ? res.errorMsg : '服务器问题，请稍后重试';
                    common.layAlert(msg);
                }
            });
        }
    });

    var _carObj = new seatsList();

    exports.init = function(param) {
        _carObj.init(param);
    };
});