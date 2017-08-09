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
            var me = this;
            common.subordinateTree({
                loadSIM: false, //不加载sim
                orgNo: me.searchParam.Subordinate, // 机构编号
                EquipmentNo: me.searchParam.EquipmentNo, //设备编号
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
            common.ajax(api.reportManager.obdReport, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var content = res.content || {};
                    var total = content.TotalCount || 0;
                    var data = content.Page || [];
                    $('#obdReportList > table > tbody').empty().html(template.compile(tpls.list)({
                        data: data
                    }));
                    common.page(total, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.PageIndex = currPage;
                        common.changeHash('#OBDReport/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统错误，请联系管理员!';
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
                    EquipmentNo: '',
                    PlateNo: '',
                    STime: '',
                    ETime: '',
                    timeType: 'custom'
                }
            } else {
                if (param && _.isEmpty(param)) {
                    _param = {
                        SubordinateName: common.getElValue('#txtSubordinate'),
                        Subordinate: $('#txtSubordinate').data('orgNo') || '',
                        EquipmentNo: common.getElValue('#selDevice'),
                        PlateNo: common.getElValue('#selPlateNumber'),
                        STime: common.getElValue('#startTime'),
                        ETime: common.getElValue('#endTime'),
                        timeType: $('span.time-area.active').attr('data-type') || 'custom'
                    }
                } else {
                    _param = param;
                }
            }
            this.searchParam = common.getParams(null, true, _param);
        },
        exportList: function(el) {
            common.layMsg('未实现!');
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
            // 查询-事件监听
            $('.panel-toolbar').on('click', '.js_list_search', function(event) {
                me.getParams();
                common.changeHash('#OBDReport/index/', me.searchParam);
            }).on('click', '.js_list_reset', function() {
                me.getParams(null, true);
                common.changeHash('#OBDReport/index/', me.searchParam);
            });
            // 事件监听
            $('#main-content').off()
                // 导出
                .on('click', '.js_list_export', function() {
                    me.exportList($(this));
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

    var _obdReport = new obdReport();

    exports.init = function(param) {
        _obdReport.init(param);
    };
});