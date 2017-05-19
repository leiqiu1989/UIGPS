define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    // 模板
    var tpls = {
        index: require('../../tpl/serviceDue/index'),
        list: require('../../tpl/serviceDue/list')
    };

    function serviceDue() {}
    $.extend(serviceDue.prototype, {
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
            common.subordinateTree(true, true, false, null, me.searchParam.orgNo);
            common.layUIForm();
            setTimeout(function() {
                var orgNo = me.searchParam.orgNo;
                var EquipmentNo = me.searchParam.EquipmentNo;
                var PlateNo = me.searchParam.PlateNo;
                var timeType = me.searchParam.timeType;
                // 绑定查询参数到控件
                common.initSearchCondition({
                    orgNo: orgNo,
                    EquipmentNo: EquipmentNo,
                    PlateNo: PlateNo,
                    timeType: timeType
                });
                // status
                $('#selStatus').val(me.searchParam.IsOpen);
                var txtStatus = $('#selStatus > option:selected').text();
                $('#selStatus').next().find(':text').val(txtStatus).end()
                    .find('dd[lay-value=' + me.searchParam.IsOpen + ']').addClass('layui-this').siblings().removeClass('layui-this');
            }, 500);
        },
        getData: function() {
            var me = this;
            var param = this.searchParam;
            param = $.extend({}, param, this.sortParam ? this.sortParam : {});
            common.loading('show');
            common.ajax(api.serverDueManager.list, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var content = res.content || {};
                    var total = content.TotalCount || 0;
                    var data = content.Page || [];
                    $('#serviceDueList > table > tbody').empty().html(template.compile(tpls.list)({
                        data: data
                    }));
                    common.page(total, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.PageIndex = currPage;
                        common.changeHash('#serviceDue/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
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
                    OrgName: '',
                    OrgNo: '',
                    EquipmentNo: '',
                    PlateNo: '',
                    StartTime: '',
                    EndTime: '',
                    timeType: 'custom',
                    IsExpire: 2
                }
            } else {
                if (param && _.isEmpty(param)) {
                    _param = {
                        OrgName: common.getElValue('#txtSubordinate'),
                        OrgNo: $('#txtSubordinate').data('orgNo') || '',
                        EquipmentNo: common.getElValue('#selDevice'),
                        PlateNo: common.getElValue('#selPlateNumber'),
                        StartTime: common.getElValue('#startTime'),
                        EndTime: common.getElValue('#endTime'),
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
            var accountId = common.getCookie('accountid');
            var userType = common.getCookie('usertype');
            var orgNo = common.getCookie('orgno');
            var token = common.getCookie('token');
            var src = api.invoiceManager.export+'?AccountId=' + accountId + '&UserType=' + userType + '&OrgNo=' + orgNo + '&Token=' + token;
            $.each(this.searchParam, function(key, value) {
                src += '&' + key + '=' + value;
            });
            var downSrc = encodeURI(src);
            $(el).attr('href', downSrc);
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
                    common.changeHash('#serviceDue/index/', me.searchParam);
                })
                // 重置
                .on('click', '.js_list_reset', function() {
                    me.getParams(null, true);
                    common.changeHash('#serviceDue/index/', me.searchParam);
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

    var _serviceDue = new serviceDue();

    exports.init = function(param) {
        _serviceDue.init(param);
    };
});