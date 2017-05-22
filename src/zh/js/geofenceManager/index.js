define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    // 模板
    var tpls = {
        index: require('../../tpl/geofenceManager/index'),
        list: require('../../tpl/geofenceManager/list')
    };

    function geofenceManager() {}
    $.extend(geofenceManager.prototype, {
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
            common.ajax(api.reportManager.mileageReport, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    $('#geofenceManagerList > table > tbody').empty().html(template.compile(tpls.list)({
                        data: data.Page || []
                    }));
                    common.page(data.TotalCount, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.pageNumber = currPage;
                        common.changeHash('#invoiceManager/index/', me.searchParam);
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
                // 新增
                .on('click', '.js_list_add', function() {
                    common.changeHash('#geofenceManager/add');
                })
                // 导出
                .on('click', '.js_list_export', function() {
                    me.exportCarList($(this));
                })
                // 开票
                .on('click', '.js_list_invoice', function() {
                    common.layUI({
                        title: '开票',
                        area: '500px',
                        btn: [],
                        content: template.compile(tpls.invoice)({ data: {} }),
                        success: function(el) {}
                    });
                })
                // 查询
                .on('click', '.js_search', function(event) {
                    me.getParams(true);
                    common.changeHash('#geofenceManager/index/', me.searchParam);
                })
                // 重置
                .on('click', '.js_list_reset', function() {
                    common.removeLocationStorage('roleManagerSearchParams'); // 投诉管理
                    me.getParams(false);
                    common.changeHash('#geofenceManager/index/', me.searchParam);
                })
                // 时间切换
                .on('click', '.time-area', function() {
                    $(this).siblings().removeClass('active');
                    $(this).toggleClass('active');
                    var type = $(this).data('type');
                    common.initDateRangeChange(type);
                });
        }
    });

    var _geofenceManager = new geofenceManager();

    exports.init = function(param) {
        _geofenceManager.init(param);
    };
});