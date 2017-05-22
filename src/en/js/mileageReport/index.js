define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    // 模板
    var tpls = {
        index: require('../../tpl/mileageReport/index'),
        list: require('../../tpl/mileageReport/list')
    };

    function mileageReport() {}
    $.extend(mileageReport.prototype, {
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
            var me = this;
            common.subordinateTree({
                loadSIM: false, //不加载sim
                loadDevice: false, //不加载设备编号
                orgNo: me.searchParam.Subordinate, // 机构编号
                PlateNo: me.searchParam.PlateNo, //车牌号码                
                timeType: me.searchParam.timeType, //时间类型
                startTime: me.searchParam.Stime, // 开始时间
                endTime: me.searchParam.ETime // 结束时间
            });
            common.layUIForm();
        },
        getData: function() {
            var me = this;
            var param = this.searchParam;
            param = $.extend({}, param, this.sortParam ? this.sortParam : {});
            common.loading('show');
            common.ajax(api.reportManager.mileageReport, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var content = res.content || {};
                    var total = content.TotalCount || 0;
                    var data = content.Page || [];
                    $('#mileageReportList > table > tbody').empty().html(template.compile(tpls.list)({
                        data: data
                    }));
                    common.page(total, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.PageIndex = currPage;
                        common.changeHash('#mileageReport/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || 'System error, please contact the administrator!';
                    common.layMsg(msg);
                    return false;
                }
                common.loading();
            });
        },
        // 获取查询条件
        getParams: function(param, reset) {
            param = param || {};
            reset = reset || false;
            this.sortParam = {};
            var _param = null;
            if (reset) {
                _param = {
                    SubordinateName: '',
                    Subordinate: '',
                    PlateNo: '',
                    STime: '',
                    ETime: '',
                    timeType: 'custom',
                    IsExpire: 2
                }
            } else {
                if (param && _.isEmpty(param)) {
                    _param = {
                        SubordinateName: common.getElValue('#txtSubordinate'),
                        Subordinate: $('#txtSubordinate').data('orgNo') || '',
                        PlateNo: common.getElValue('#selPlateNumber'),
                        STime: common.getElValue('#startTime'),
                        ETime: common.getElValue('#endTime'),
                        timeType: $('span.time-area.active').attr('data-type') || 'custom',
                        IsExpire: common.getElValue('#selStatus') || 2
                    }
                } else {
                    _param = param;
                }
            }
            this.searchParam = common.getParams(null, true, _param);
        },
        exportList: function(el) {
            common.layMsg('No Implementation');
            // var accountId = common.getCookie('accountid');
            // var userType = common.getCookie('usertype');
            // var orgNo = common.getCookie('orgno');
            // var token = common.getCookie('token');
            // var src = api.serverDueManager.export+'?AccountId=' + accountId + '&UserType=' + userType + '&OrgNo=' + orgNo + '&Token=' + token;
            // $.each(this.searchParam, function(key, value) {
            //     src += '&' + key + '=' + value;
            // });
            // var downSrc = encodeURI(src);
            // $(el).attr('href', downSrc);
        },
        event: function() {
            var me = this;
            // 事件监听
            $('#main-content').off()
                // 导出
                .on('click', '.js_list_export', function() {
                    me.exportList($(this));
                })
                // 查询
                .on('click', '.js_list_search', function() {
                    me.getParams();
                    common.changeHash('#mileageReport/index/', me.searchParam);
                })
                // 重置
                .on('click', '.js_list_reset', function() {
                    me.getParams(null, true);
                    common.changeHash('#mileageReport/index/', me.searchParam);
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

    var _mileageReport = new mileageReport();

    exports.init = function(param) {
        _mileageReport.init(param);
    };
});