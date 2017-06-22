define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    // 模板
    var tpls = {
        index: require('../../tpl/organizetionManager/index'),
        list: require('../../tpl/organizetionManager/list')
    };

    function organizetionManager() {}
    $.extend(organizetionManager.prototype, {
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
                orgNo: me.searchParam.OnlyOrgNo, // 机构编号
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
                    OnlyOrgNo: ''
                }
            } else {
                if (param && _.isEmpty(param)) {
                    _param = {
                        SubordinateName: common.getElValue('#txtSubordinate'),
                        OnlyOrgNo: $('#txtSubordinate').data('orgNo') || '',
                    }
                } else {
                    _param = param;
                }
            }
            this.searchParam = common.getParams(null, true, _param);
        },
        deleteOrg: function(orgId, confirmText) {
            var me = this;
            common.layConfirm(confirmText, function() {
                common.loading('show', 'Data processing...');
                common.ajax(api.orgManager.del, {
                    OrgIds: orgId
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
            common.ajax(api.orgManager.list, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    $('#orgManagerList > table > tbody').empty().html(template.compile(tpls.list)({
                        data: data.Page || []
                    }));
                    common.page(data.TotalCount, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.PageIndex = currPage;
                        common.changeHash('#organizetionManager/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统错误，请联系管理员!';
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
                common.changeHash('#organizetionManager/index/', me.searchParam);
            }).on('click', '.js_list_reset', function() {
                me.getParams(null, true);
                common.changeHash('#organizetionManager/index/', me.searchParam);
            });
            // 事件监听
            $('#main-content').on('click', '.js_list_add', function() {
                    common.changeHash('#organizetionManager/edit');
                })
                //编辑组织
                .on('click', '.js_list_edit', function() {
                    var tr = $(this).closest('tr');
                    var id = tr.data('orgid');
                    common.changeHash('#organizetionManager/edit/', { id: id });
                })
                //删除组织机构
                .on('click', '.js_list_delete', function() {
                    var ogrId = $(this).closest('tr').data('orgid');
                    var confirmText = '确认删除?';
                    me.deleteOrg(ogrId, confirmText);
                });
        }
    });

    exports.init = function(param) {
        new organizetionManager().init(param);
    };
});