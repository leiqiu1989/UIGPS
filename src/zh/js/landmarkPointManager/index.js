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
        getParams: function(param, reset) {
            param = param || {};
            reset = reset || false;
            this.sortParam = {};
            var _param = null;
            if (reset || param.back) {
                _param = {
                    landMarkName: ''
                }
            } else {
                if (param && _.isEmpty(param)) {
                    _param = {
                        landMarkName: common.getElValue('input[name="landMarkName"]') //地标点名称
                    }
                } else {
                    _param = param;
                }
            }
            this.searchParam = common.getParams(null, true, _param);
        },
        getData: function() {
            var me = this;
            var param = this.searchParam;
            param = $.extend({}, param, this.sortParam ? this.sortParam : {});
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
                    common.layMsg(msg);
                }
                common.loading();
            });
        },
        //删除地标点
        deleteLandMarkPoint: function(id, confirmText) {
            var me = this;
            common.layConfirm(confirmText, function() {
                common.loading('show', '数据正在处理中...');
                common.ajax(api.landMarkPointManager.del, {
                    KeyIds: id
                }, function(res) {
                    if (res && res.status === 'SUCCESS') {
                        me.getData();
                    } else {
                        var msg = res.errorMsg || '系统出错，请联系管理员！';
                        common.layMsg(msg);
                    }
                    common.loading();
                });
            });
        },
        event: function() {
            var me = this;
            // 查询-事件监听
            $('.panel-toolbar').on('click', '.js_list_search', function() {
                me.getParams();
                common.changeHash('#landmarkPointManager/index/', me.searchParam);
            }).on('click', '.js_list_reset', function() {
                me.getParams(null, true);
                common.changeHash('#landmarkPointManager/index/', me.searchParam);
            });
            // 事件监听
            $('#main-content').on('click', '.js_list_add', function() {
                    common.changeHash('#landmarkPointManager/edit');
                })
                //编辑地标点
                .on('click', '.js_list_edit', function() {
                    var tr = $(this).closest('tr');
                    var id = tr.data('id');
                    common.changeHash('#landmarkPointManager/edit/', { id: id });
                })
                //删除
                .on('click', '.js_list_delete', function() {
                    var id = $(this).closest('tr').data('id');
                    var confirmText = '确定要删除该地标点吗？';
                    me.deleteLandMarkPoint(id, confirmText);
                });
        }
    });

    exports.init = function(param) {
        new landMarkPoint().init(param);
    };
});