define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    // 模板
    var tpls = {
        index: require('../../tpl/alarmReport/index'),
        list: require('../../tpl/alarmReport/list')
    };

    function alarmReport() {}
    $.extend(alarmReport.prototype, {
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
                loadAlarm: true, // 加载警情
                AlarmCode: me.searchParam.AlarmCode, //警情
                orgNo: me.searchParam.Subordinate, // 机构编号
                EquipmentNo: me.searchParam.EquipmentNo, //设备编号
                PlateNo: me.searchParam.PlateNo, //车牌号码                
                timeType: me.searchParam.timeType, //时间类型
                startTime: me.searchParam.STime, // 开始时间
                endTime: me.searchParam.ETime // 结束时间
            });
            // status
            $('#selStatus').val(me.searchParam.AlarmStatus);
            var txtStatus = $('#selStatus > option:selected').text();
            $('#selStatus').next().find(':text').val(txtStatus).end()
                .find('dd[lay-value=' + me.searchParam.AlarmStatus + ']').addClass('layui-this').siblings().removeClass('layui-this');
            common.layUIForm();
        },
        getData: function() {
            var me = this;
            var param = this.searchParam;
            param = $.extend({}, param, this.sortParam ? this.sortParam : {});
            common.loading('show');
            common.ajax(api.reportManager.alarmReport, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var content = res.content || {};
                    var total = content.TotalCount || 0;
                    var data = content.Page || [];
                    $('#alarmReportList > table > tbody').empty().html(template.compile(tpls.list)({
                        data: data
                    }));
                    common.page(total, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.PageIndex = currPage;
                        common.changeHash('#alarmReport/index/', me.searchParam);
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
                    EquipmentNo: '',
                    AlarmCode: '',
                    PlateNo: '',
                    STime: '',
                    ETime: '',
                    AlarmStatus: -1,
                    timeType: 'custom'
                }
            } else {
                if (param && _.isEmpty(param)) {
                    _param = {
                        SubordinateName: common.getElValue('#txtSubordinate'),
                        Subordinate: $('#txtSubordinate').data('orgNo') || '',
                        EquipmentNo: common.getElValue('#selDevice'),
                        AlarmCode: common.getElValue('#selAlarm'),
                        PlateNo: common.getElValue('#selPlateNumber'),
                        STime: common.getElValue('#startTime'),
                        ETime: common.getElValue('#endTime'),
                        timeType: $('span.time-area.active').attr('data-type') || 'custom',
                        AlarmStatus: common.getElValue('#selStatus') || -1
                    }
                } else {
                    _param = param;
                }
            }
            this.searchParam = common.getParams(null, true, _param);
        },
        exportList: function(el) {
            var accountId = common.getCookie('accountid');
            var userType = common.getCookie('usertype');
            var orgNo = common.getCookie('orgno');
            var token = common.getCookie('token');
            common.layMsg('No Implementation');
            // var src = api.renewLogManager.export+'?AccountId=' + accountId + '&UserType=' + userType + '&OrgNo=' + orgNo + '&Token=' + token;
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
                    common.changeHash('#alarmReport/index/', me.searchParam);
                })
                // 详情
                .on('click', '.js_list_detail', function() {
                    common.layMsg('No Implementation');
                })
                // 重置
                .on('click', '.js_list_reset', function() {
                    me.getParams(null, true);
                    common.changeHash('#alarmReport/index/', me.searchParam);
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

    var _alarmReport = new alarmReport();

    exports.init = function(param) {
        _alarmReport.init(param);
    };
});