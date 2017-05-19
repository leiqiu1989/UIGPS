define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    // 模板
    var tpls = {
        index: require('../../tpl/invoiceManager/index'),
        list: require('../../tpl/invoiceManager/list'),
        invoice: require('../../tpl/invoiceManager/invoice')
    };

    function invoiceManager() {}
    $.extend(invoiceManager.prototype, {
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
            common.ajax(api.invoiceManager.list, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var content = res.content || {};
                    var total = content.TotalCount || 0;
                    var data = content.Page || [];
                    $('#invoiceManagerList > table > tbody').empty().html(template.compile(tpls.list)({
                        data: data
                    }));
                    common.page(total, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.PageIndex = currPage;
                        common.changeHash('#invoiceManager/index/', me.searchParam);
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
                    orgName: '',
                    orgNo: '',
                    EquipmentNo: '',
                    PlateNo: '',
                    StartTime: '',
                    EndTime: '',
                    timeType: 'custom',
                    IsOpen: 2
                }
            } else {
                if (param && _.isEmpty(param)) {
                    _param = {
                        orgName: common.getElValue('#txtSubordinate'),
                        orgNo: $('#txtSubordinate').data('orgNo') || '',
                        EquipmentNo: common.getElValue('#selDevice'),
                        PlateNo: common.getElValue('#selPlateNumber'),
                        StartTime: common.getElValue('#startTime'),
                        EndTime: common.getElValue('#endTime'),
                        timeType: $('span.time-area.active').attr('data-type') || 'custom',
                        IsOpen: common.getElValue('#selStatus') || 2
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
                // 开票
                .on('click', '.js_list_invoice', function() {
                    var $tr = $(this).closest('tr');
                    var id = $tr.attr('data-id');
                    var plateNo = $tr.attr('data-plateNo');
                    var equipmentNo = $tr.attr('data-equipmentNo');
                    var payTime = $tr.attr('data-payTime');
                    var fee = $tr.attr('data-fee');
                    var data = { id, plateNo, equipmentNo, payTime, fee, };
                    common.layUI({
                        title: 'Invoice',
                        area: '500px',
                        btn: [],
                        content: template.compile(tpls.invoice)(data),
                        success: function(el) {
                            $(el).find('.js_Inovice').on('click', function() {
                                var invTitle = $.trim($('input[name="txtInvoiceTitle"]').val());
                                common.ajax(api.invoiceManager.openInvoice, {
                                    Fee: data.fee,
                                    RechargeId: data.id,
                                    Title: invTitle
                                }, function(res) {
                                    if (res.status === 'SUCCESS') {
                                        common.layMsg('Invoice Success!');
                                        common.changeHash('#invoiceManager/index');
                                    } else {
                                        var msg = res.errorMsg || '系统出错，请联系管理员！';
                                        common.layMsg(msg);
                                    }
                                    common.loading();
                                });
                            });
                        }
                    });
                })
                // 查询
                .on('click', '.js_list_search', function() {
                    me.getParams();
                    common.changeHash('#invoiceManager/index/', me.searchParam);
                })
                // 重置
                .on('click', '.js_list_reset', function() {
                    me.getParams(null, true);
                    common.changeHash('#invoiceManager/index/', me.searchParam);
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

    var _invoiceManager = new invoiceManager();

    exports.init = function(param) {
        _invoiceManager.init(param);
    };
});