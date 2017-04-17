define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    // 模板
    var tpls = {
        index: require('../../tpl/landmarkPointManager/index'),
        list: require('../../tpl/landmarkPointManager/list')
    };

    var landMarkPoint = function() {};
    $.extend(landMarkPoint.prototype, {
        init: function(param) {
            // 初始化查询条件参数
            this.getParams(param);
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.index)({ searchValue: this.searchParam }));
            // 获取数据
            this.getData();
            // 事件绑定
            this.event();
        },
        // 获取查询条件
        getParams: function(param) {
            this.sortParam = {};
            var newParams = {
                landMarkName: common.getElValue('input[name="landMarkName"]'), //地标点名称
            };
            this.searchParam = common.getParams('landMarkPointParams', param, newParams, true);
        },
        getData: function() {
            var me = this;
            var param = this.searchParam;
            param = $.extend({}, param, this.sortParam ? this.sortParam : {});
            // 将查询条件保存到localStorage里面
            common.setlocationStorage('landMarkPointParams', JSON.stringify(this.searchParam));
            common.loading('show');
            common.ajax(api.landMarkPointManager.list, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    $('#landMarkPontList > table > tbody').empty().html(template.compile(tpls.list)({
                        data: data.Page || [],
                    }));
                    common.page(data.TotalCount, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.PageIndex = currPage;
                        common.changeHash('#landmarkPointManager/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
                common.loading();
            });
        },
        //删除车辆
        deleteLandMarkPoint: function(id, confirmText) {
            var me = this;
            common.confirm(confirmText, function() {
                common.loading('show', '数据正在处理中...');
                common.ajax(api.landMarkPointManager.del, {
                    KeyIds: id
                }, function(res) {
                    if (res && res.status === 'SUCCESS') {
                        me.getData();
                    } else {
                        var msg = res.errorMsg || '系统出错，请联系管理员！';
                        common.toast(msg);
                    }
                    common.loading();
                });
            });
        },
        event: function() {
            var me = this;
            // 所属机构事件监听
            common.listenOrganization();
            // 查询-事件监听
            $('.panel-toolbar').on('click', '.js_list_search', function() {
                me.getParams(true);
                common.changeHash('#landmarkPointManager/index/', me.searchParam);
            }).on('click', '.js_list_reset', function() {
                common.removeLocationStorage('landMarkPointParams'); // 车辆管理
                me.getParams(false);
                common.changeHash('#landmarkPointManager/index/', me.searchParam);
            });
            // 事件监听
            $('#main-content').on('click', '.js_list_add', function() {
                    common.changeHash('#landmarkPointManager/edit');
                })
                //编辑车辆
                .on('click', '.js_list_edit', function() {
                    var tr = $(this).closest('tr');
                    var id = tr.data('id');
                    common.changeHash('#landmarkPointManager/edit/', { id: id });
                })
                //批量、单个删除车辆
                .on('click', '.js_list_delete', function() {
                    var id = $(this).closest('tr').data('id');
                    var confirmText = '';
                    if (id) {
                        confirmText = '确定要删除该地标点吗？';
                    } else {
                        var chks = $('.datatable-content table > tbody input[name="checkItem"]:checked');
                        if (chks.size() < 1) {
                            common.toast('请选择要删除的地标点！');
                            return false;
                        }
                        confirmText = '已选择&nbsp;<span class="red">' + chks.size() + '</span>&nbsp;条数据，是否对其进行删除？';
                        var array = [];
                        $.each(chks, function(i, item) {
                            array.push($(item).closest('tr').data('id'));
                        });
                        id = array.join(',');
                    }
                    me.deleteLandMarkPoint(id, confirmText);
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
        new landMarkPoint().init(param);
    };
});