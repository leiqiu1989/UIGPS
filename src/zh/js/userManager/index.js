define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    // 模板
    var tpls = {
        index: require('../../tpl/userManager/index'),
        list: require('../../tpl/userManager/list')
    };

    function userManager() {}
    $.extend(userManager.prototype, {
        init: function(param) {
            // 初始化查询条件参数
            this.getParams(param);
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.index)({ searchValue: this.searchParam }));
            // 控件初始化
            this.initControl();
            // 获取数据
            this.getData();
        },
        // 初始化控件
        initControl: function() {
            var me = this;
            this.event();
            common.tableSort(function(sortParam) {
                me.sortParam = sortParam;
                me.getData();
            });
        },
        // 获取查询条件
        getParams: function(param) {
            this.sortParam = {};
            var newParams = {
                OnlyOrgNo: common.getElValue(':hidden[name="OnlyOrgNo"]'), //所属机构
                Condition: common.getElValue('input[name="Condition"]') //关键字
            };
            this.searchParam = common.getParams('userManagerParams', param, newParams, true);
        },
        deleteUser: function(orgId, confirmText) {
            var me = this;
            common.layConfirm(confirmText, function() {
                common.loading('show', '数据正在处理中...');
                common.ajax(api.userManager.del, {
                    OrgIds: orgId
                }, function(res) {
                    if (res.status === 'SUCCESS') {
                        me.getData();
                        common.layMsg('删除用户成功!', 'success');
                    } else {
                        var msg = res.errorMsg || '系统出错，请联系管理员！';
                        common.layMsg(msg);
                    }
                    common.loading();
                });
            });
        },
        getData: function() {
            var me = this;
            var param = this.searchParam;
            param = $.extend({}, param, this.sortParam ? this.sortParam : {});
            // 将查询条件保存到localStorage里面
            common.setlocationStorage('userManagerParams', JSON.stringify(this.searchParam));
            common.loading('show');
            common.ajax(api.userManager.list, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    $('#userManagerList > table > tbody').empty().html(template.compile(tpls.list)({
                        data: data.Page || []
                    }));
                    common.page(data.TotalCount, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.PageIndex = currPage;
                        common.changeHash('#userManager/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.layMsg(msg);
                }
                common.loading();
            });
        },
        event: function() {
            var me = this;
            // 所属机构事件监听
            common.listenOrganization();
            // 查询-事件监听
            $('.panel-toolbar').on('click', '.js_list_search', function() {
                me.getParams(true);
                common.changeHash('#userManager/index/', me.searchParam);
            }).on('click', '.js_list_reset', function() {
                common.removeLocationStorage('userManagerParams'); // 组织用户管理
                me.getParams(false);
                common.changeHash('#userManager/index/', me.searchParam);
            });
            // 事件监听
            $('#main-content').on('click', '.js_list_add', function() {
                    common.changeHash('#userManager/edit');
                })
                //编辑车辆
                .on('click', '.js_list_edit', function() {
                    var tr = $(this).closest('tr');
                    var id = tr.data('orgid');
                    common.changeHash('#userManager/edit/', { id: id });
                })
                //批量、单个删除车辆
                .on('click', '.js_list_delete', function() {
                    var ogrId = $(this).closest('tr').data('orgid');
                    var confirmText = '';
                    if (ogrId) {
                        confirmText = '确定要删除该该用户吗？';
                    } else {
                        var chks = $('.datatable-content table > tbody input[name="checkItem"]:checked');
                        if (chks.size() < 1) {
                            common.layMsg('请选择要删除的用户!');
                            return false;
                        }
                        confirmText = '已选择&nbsp;<span class="red">' + chks.size() + '</span>&nbsp;个用户，是否进行删除？';
                        var array = [];
                        $.each(chks, function(i, item) {
                            array.push($(item).closest('tr').data('orgid'));
                        });
                        ogrId = array.join(',');
                    }
                    me.deleteUser(ogrId, confirmText);
                }).on('click', 'input[name="checkAll"]', function() {
                    var isChecked = $(this).is(':checked');
                    if (isChecked) {
                        $('.datatable-content table > tbody input[name="checkItem"]').prop('checked', isChecked);
                    } else {
                        $('.datatable-content table > tbody input[name="checkItem"]').removeAttr('checked');
                    }
                }).on('click', 'input[name="checkItem"]', function() {
                    var chks = $('.datatable-content table > tbody input[name="checkItem"]:checked').size();
                    var totalChks = $('.datatable-content table > tbody input[name="checkItem"]').size();
                    if (chks == totalChks) {
                        $('.datatable-header table > thead input[name="checkAll"]').prop('checked', true);
                    } else {
                        $('.datatable-header table > thead input[name="checkAll"]').removeAttr('checked');
                    }
                });
        }
    });

    exports.init = function(param) {
        new userManager().init(param);
    };
});