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
            common.subordinateTree({
                orgNo: me.searchParam.Subordinate, // 机构编号
                loadDevice: false,
                loadPlateNum: false,
                loadSIM: false,
                timeType: null
            });
            common.layUIForm();
        },
        // 获取查询条件
        getParams: function(param, reset) {
            param = param || {};
            reset = reset || false;
            this.sortParam = {};
            var _param = null;
            if (reset || param.back) {
                _param = {
                    SubordinateName: '',
                    Subordinate: '',
                    UserName: ''
                }
            } else {
                if (param && _.isEmpty(param)) {
                    _param = {
                        SubordinateName: common.getElValue('#txtSubordinate'),
                        Subordinate: $('#txtSubordinate').data('orgNo') || '',
                        UserName: $('#txtUserName').val()
                    }
                } else {
                    _param = param;
                }
            }
            this.searchParam = common.getParams(null, true, _param);
        },
        deleteUser: function(uid, confirmText) {
            var me = this;
            common.layConfirm(confirmText, function() {
                common.loading('show', 'Data processing...');
                common.ajax(api.userManager.del, {
                    userId: uid
                }, function(res) {
                    if (res.status === 'SUCCESS') {
                        me.getData();
                        common.layMsg('SUCCESS!', 'success');
                    } else {
                        var msg = res.errorMsg || '系统错误，请联系管理员!';
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
                    var msg = res.errorMsg || 'System error, please contact the administrator!';
                    common.layMsg(msg);
                }
                common.loading();
            });
        },
        event: function() {
            var me = this;
            // 查询-事件监听
            $('.panel-toolbar').on('click', '.js_list_search', function() {
                me.getParams();
                common.changeHash('#userManager/index/', me.searchParam);
            }).on('click', '.js_list_reset', function() {
                me.getParams(null, true);
                common.changeHash('#userManager/index/', me.searchParam);
            });
            // 事件监听
            $('#main-content').off().on('click', '.js_list_add', function() {
                    common.changeHash('#userManager/edit');
                })
                //编辑用户
                .on('click', '.js_list_edit', function() {
                    var tr = $(this).closest('tr');
                    var id = tr.attr('data-uid');
                    common.changeHash('#userManager/edit/', { id: id });
                })
                //删除用户
                .on('click', '.js_list_delete', function() {
                    var uid = $(this).closest('tr').attr('data-uid');
                    var confirmText = '确认删除该用户?';
                    me.deleteUser(uid, confirmText);
                });
        }
    });

    exports.init = function(param) {
        new userManager().init(param);
    };
});