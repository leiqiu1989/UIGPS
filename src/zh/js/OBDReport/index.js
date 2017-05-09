define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    // 模板
    var tpls = {
        index: require('../../tpl/OBDReport/index'),
        list: require('../../tpl/OBDReport/list')
    };

    function obdReport() {}
    $.extend(obdReport.prototype, {
        init: function(param) {
            // 初始化查询条件参数
            this.getParams(param);
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.index)({ searchValue: this.searchParam }));

            this.initControl();

            this.event();
            // 获取数据
            this.getData();
        },
        initControl: function() {
            common.initDateTime('input[name="startTime"]', 'Y-m-d', true, 'yyyy-MM-dd', false);
            common.initDateTime('input[name="endTime"]', 'Y-m-d', true, 'yyyy-MM-dd', false);
        },
        getData: function() {
            var me = this;
            var param = this.searchParam;
            param = $.extend({}, param, this.sortParam ? this.sortParam : {});
            // 将查询条件保存到localStorage里面
            common.setlocationStorage('obdReportSearchParams', JSON.stringify(this.searchParam));
            common.loading('show');
            common.ajax(api.reportManager.obdReport, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    $('#obdReportList > table > tbody').empty().html(template.compile(tpls.list)({
                        data: data.Page || []
                    }));
                    common.page(data.TotalCount, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.pageNumber = currPage;
                        common.changeHash('#obdReportList/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.layMsg(msg);
                }
                common.loading();
            });
        },
        // 获取查询条件
        getParams: function(param) {
            this.sortParam = {};
            var newParams = {
                RoleName: common.getElValue('input[name="RoleName"]')
            };
            if (!param) {
                newParams = {};
            }
            this.searchParam = common.getParams('roleManagerSearchParams', param, newParams, true);
        },
        exportCarList: function(el) {
            this.getParams();
            var st = common.getCookie('st');
            var sid = common.getCookie('sid');
            var src = api.carManager.exportCarList + '?sid=' + sid + '&st=' + st;
            $.each(this.searchParam, function(key, value) {
                src += '&' + key + '=' + value;
            });
            var downSrc = encodeURI(src);
            $(el).attr('href', downSrc);
        },
        event: function() {
            var me = this;
            // 所属机构事件监听
            common.listenOrganization();
            // 事件监听
            $('#main-content').off()
                // 导出
                .on('click', '.js_list_export', function() {
                    me.exportCarList($(this));
                })
                // 查询
                .on('click', '.js_search', function(event) {
                    me.getParams(true);
                    common.changeHash('#roleManager/index/', me.searchParam);
                })
                // 重置
                .on('click', '.js_list_reset', function() {
                    common.removeLocationStorage('roleManagerSearchParams'); // 投诉管理
                    me.getParams(false);
                    common.changeHash('#roleManager/index/', me.searchParam);
                })
                // 时间切换
                .on('click', '.time-area', function() {
                    $(this).siblings().removeClass('active');
                    $(this).toggleClass('active');
                    var type = $(this).data('type');
                    //按周日为一周的最后一天计算
                    var date = new Date();
                    var startTime = null;
                    var endTime = date.format('yyyy-MM-dd');
                    switch (type) {
                        case 'week':
                            var this_day = date.getDay(); //今天是这周的第几天
                            var step_s = -this_day + 1; //上周日距离今天的天数（负数表示）
                            if (this_day === 0) {
                                step_s = -7; // 如果今天是周日
                            }
                            // var step_m = 7 - this_day; // 周日距离今天的天数（负数表示）
                            var thisTime = date.getTime();
                            startTime = new Date(thisTime + step_s * 24 * 3600 * 1000).format('yyyy-MM-dd');
                            break;
                        case 'month':
                            startTime = new Date(date.getFullYear(), date.getMonth(), 1).format('yyyy-MM-dd');
                            break;
                        case 'custom':
                            startTime = date.format('yyyy-MM-dd');
                            break;
                    }
                    if (type != 'custom') {
                        $('input[name="startTime"],input[name="endTime"]').datetimepicker('destroy');
                    } else {
                        me.initTime();
                    }
                    $('input[name="startTime"]').val(startTime);
                    $('input[name="endTime"]').val(endTime);
                });
        }
    });

    var _obdReport = new obdReport();

    exports.init = function(param) {
        _obdReport.init(param);
    };
});