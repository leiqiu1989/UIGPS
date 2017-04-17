define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    var validate = require('validate');

    // 模板
    var tpls = {
        add: require('../../tpl/carManager/add')
    };

    var carAdd = function() {
        this.orgId = null;
        this.truckId = null;
        this.isEdit = null;
        this.oldOrgId = null;
        this.truckTypeIsLoaded = false; //标识车辆类型是否加载完毕
        this.vehicleBrandIsLoaded = false; // 标识车辆品牌是否加载完毕
    };

    $.extend(carAdd.prototype, {
        init: function(truckId, orgId) {
            this.truckId = truckId;
            this.orgId = orgId || null;
            this.isEdit = !!truckId;
            this.obj = {
                Driver: {},
                Equipment: {},
                Simcard: {},
                Vehicle: {}
            };
            if (orgId) this.oldOrgId = orgId;
            this.initPage();
        },
        bindEditValue: function(data) {
            // 先绑定值，然后初始化编辑控件
            //common.setFormData('#frmaddCar', data);
            $.extend(this.obj, {
                Driver: data.Driver || {},
                Equipment: data.Equipment || {},
                Simcard: data.Simcard || {},
                Vehicle: data.Vehicle || {}
            });
            $('#main-content').empty().html(template.compile(tpls.add)({ title: (this.isEdit ? '编辑车辆' : '新增车辆'), data: this.obj }));
            // checkbox单独处理
            $('input[name="needExamined"]').attr('checked', data.needExamined == 1 ? true : false);
            this.initSelect();
            this.validate();
            this.event();
            //this.initEditControl(data);
        },
        initEditValue: function() {
            var me = this;
            common.ajax(api.carManager.detail, {
                Vid: this.truckId,
                orgId: this.orgId
            }, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    // if (data.orgId) {
                    // me.getDriverList(data.orgId, function() {
                    //     // 把当前司机填充到下拉框里面
                    //     var masterHtml = '',
                    //         copilotHtml = '';
                    //     if (data.masterDriverId && data.masterName) {
                    //         masterHtml = '<option value="' + (data.masterDriverId || '') + '" ' +
                    //             'data-mobile="' + (data.masterTelephone || '') + '" ' +
                    //             'data-permittype="' + (data.masterCardType || '') + '" ' +
                    //             'data-card="' + (data.masterIdCard || '') + '">' + (data.masterName || '') + '</option>';
                    //     }
                    //     if (data.copilotName && data.copilotDriverId) {
                    //         copilotHtml = '<option value="' + (data.copilotDriverId || '') + '" ' +
                    //             'data-mobile="' + (data.copilotTelephone || '') + '" ' +
                    //             'data-permittype="' + (data.copilotCardType || '') + '" ' +
                    //             'data-card="' + (data.copilotIdCard || '') + '">' + (data.copilotName || '') + '</option>';
                    //     }
                    //     $('#master_DriverId').append(masterHtml);
                    //     $('#copilot_DriverId').append(copilotHtml);
                    //     me.bindEditValue(data);
                    // });
                    //}
                    me.bindEditValue(data);
                }
            });
        },
        initEditControl: function(data) {
            var me = this;
            $('#plate_Number,#plateNumber_Color').attr({
                'disabled': true
            });
            $('#plateNumber_Color').attr('data-nosubmit', true);
            $('.js_add_control').remove();
            $('.js_edit_control').removeClass('hidden');
            // 获取当前组织机构下的gps设备编号列表并且把当前gps设备编号填充进去
            this.getGPSNumerList(data.uniqueId, function() {
                if (data.uniqueId) {
                    var gpsHtml = '<option value="' + data.uniqueId + '" data-name="' + data.gpsBrand + '" data-endtime="' + data.gpsEndTime + '" data-simcard="' + data.simmcard + '">' + data.uniqueId + '</option>';
                    $('select[name="uniqueId"]').append(gpsHtml).val(data.uniqueId);
                }
            });
            // 编辑根据返回的车辆类型和品牌自动填充
            var timer = setInterval(function() {
                if (me.truckTypeIsLoaded && me.vehicleBrandIsLoaded) {
                    clearInterval(timer);
                    // 判断是否存在，不在则添加
                    if ($('#truck_Type > option:contains("' + data.truckType + '")').size() < 1) {
                        var truckTypeHtml = '<option value="' + data.truckType + '" data-code="">' + data.truckType + '</option>';
                        $('#truck_Type').append(truckTypeHtml);
                        $('#truck_Type').val(data.truckType);
                    }
                    if ($('#vehicle_Brand > option:contains("' + data.vehicleBrand + '")').size() < 1) {
                        var vehicleBrandHtml = '<option value="' + data.vehicleBrand + '">' + data.vehicleBrand + '</option>';
                        $('#vehicle_Brand').append(vehicleBrandHtml);
                        $('#vehicle_Brand').val(data.vehicleBrand);
                    }
                }
            }, 500);
        },
        getGPSNumerList: function(uniqueId, callback) {
            var me = this;
            common.ajax(api.carManager.getGPSNumByOrgId, {
                orgId: this.orgId
            }, function(res) {
                if (res.status === 'OK') {
                    var data = res.content || [];
                    var html = '';
                    if (data.length > 0) {
                        $.each(data, function(i, item) {
                            html += '<option value="' + item.uniqueId + '" data-name="' + item.name + '" data-endtime="' + item.endTime + '" data-simcard="' + item.simCard + '">' + item.uniqueId + '</option>';
                        });
                        $('select[name="uniqueId"]').empty().html(html).val(uniqueId);
                    }
                    if (callback) callback();
                    // 清空gps设备信息
                    if (!uniqueId) {
                        $(':text[name="gpsBrand"],:text[name="gpsEndTime"],:text[name="simmcard"]').val('');
                    }
                }
            });
        },
        initPage: function() {
            var me = this;
            //获取车辆类型
            //this.getCarType();
            //获取车辆品牌
            //this.getCarBrand();
            // 编辑
            if (this.isEdit) {
                this.initEditValue();
            } else {
                $('#main-content').empty().html(template.compile(tpls.add)({ title: '', data: this.obj }));
                $('.js_edit_control').remove();
                this.initSelect();
                this.validate();
                this.event();
            }
        },
        initSelect: function() {
            common.initDateTime('#_outStockTime', 'Y-m-d', false, false, false, new Date());
            common.initDateTime('#gpsStartTime', 'Y-m-d', false, false, false, new Date());
            common.initDateTime('#gpsEndTime', 'Y-m-d', false, false, false, new Date());
            //获取车辆类型
            this.getSelect({
                url: api.carManager.carType,
                obj: $('#truck_Type'),
                key: ['PKey', 'PValue']
            });
            //获取车辆品牌
            this.getSelect({
                url: api.carManager.carBrand,
                obj: $('#vehicle_Brand'),
                key: ['PKey', 'PValue']
            });
            //车牌颜色
            this.getSelect({
                url: api.carManager.plateNumberColor,
                obj: $('#plateNumber_Color'),
                key: ['PKey', 'PValue']
            });
            //设备类型
            this.getSelect({
                url: api.carManager.equipmentType,
                obj: $('#equipmentType'),
                key: ['PKey', 'PValue']
            });
        },
        getSelect: function(opt) {
            var me = this;
            var obj = {
                url: opt.url,
                params: opt.params || {},
                errorMsg: opt.errorMsg || '请求错误，未请求到数据',
                key: opt.key || ['id', 'name'],
                $objs: opt.obj
            };
            me.truckTypeIsLoaded = false;
            common.ajax(obj.url, obj.params, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    var html = '';
                    if (data && data.length > 0) {
                        $.each(data, function(i, item) {
                            html += '<option value="' + item[obj.key[0]] + '">' + item[obj.key[1]] + '</option>';
                        });
                    }
                    me.truckTypeIsLoaded = true;
                    obj.$objs.html(html);
                } else {
                    var msg = res.errorMsg || obj.errorMsg;
                    common.toast(msg);
                }
            });
        },
        // 司机事件绑定
        eventDriver: function() {
            $('#master_DriverId,#copilot_DriverId').on('change', function() {
                var type = $(this).data('type');
                var selectOpt = $(this).children('option:selected');
                var mobile = $(selectOpt).data('mobile');
                var card = $(selectOpt).data('card');
                var permittype = $(selectOpt).data('permittype');
                if (type === 'master') {
                    common.setElValue('#master_Telephone', mobile);
                    common.setElValue('#master_IdCard', card);
                    common.setElValue('#master_CardType', permittype);
                } else if (type === 'copilot') {
                    common.setElValue('#copilot_Telephone', mobile);
                    common.setElValue('#copilot_IdCard', card);
                    common.setElValue('#copilot_CardType', permittype);
                }
            });
        },
        getDriverList: function(orgId, callback) {
            var me = this;
            common.ajax(api.carManager.carDriverList, {
                orgId: orgId
            }, function(res) {
                if (res.status === 'OK') {
                    var data = res.content;
                    var html = '';
                    if (data && data.length > 0) {
                        $.each(data, function(i, item) {
                            html += '<option value="' + item.driver_id + '" ' +
                                'data-mobile="' + item.telephone + '"' +
                                'data-permittype="' + item.permittype + '"' +
                                'data-card="' + item.id_card + '">' + item.driver_name + '</option>';
                        });
                    }
                    $('#master_DriverId,#copilot_DriverId').html(html);
                    $('#master_DriverId,#copilot_DriverId').val('');
                    if (callback) callback();
                    me.eventDriver();
                }
            });
        },
        validate: function() {
            var me = this;
            validate('#frmaddCar', {
                subBtn: '.js_add_save',
                promptPos: 'inline',
                submit: function() {
                        me.submitForm();
                    },
                    reg: {
                        'idcard': /^\d{17}[\d|x]|\d{15}$/
                    },
                    errorMsg: {
                        'idcard': '请输入正确的身份证号'
                    }
            });
        },
        submitForm: function() {
            var me = this;
            var url = this.isEdit ? api.carManager.update : api.carManager.submit;
            var params = common.getFormData('#frmaddCar');
            if (this.isEdit) {
                params.Vid = me.truckId;
            }
            if(me.orgId){
                params.OnlyOrgNo = me.orgId;
            }
            common.ajax(url, params, function(res) {
                if (res && res.status === 'SUCCESS') {
                    common.alert('数据操作成功', 'success', true, function() {
                        common.changeHash('#carManager/index');
                    });
                } else {
                    var msg = res.errorMsg ? res.errorMsg : '服务器问题，请稍后重试';
                    common.alert(msg, 'error');
                }
            });
        },
        clearDriveInfo: function() {
            $('#driveInfo :input').val('');
        },
        event: function() {
            var me = this;
            // 所属机构事件监听
            common.listenOrganization(function(orgId, orgName) {
                me.orgId = orgId;
                //me.getDriverList(orgId);
                //me.clearDriveInfo();
                // if (me.isEdit) {
                //     $('.js_updateGPS').removeClass('disabled');
                // }
            });
            // add event listen
            $('#main-content')
                .on('click', '.js_add_back,.js_add_cancel', function() {
                    common.changeHash('#carManager/index');
                })
                // 校验GPS设备
                .on('click', '.js_add_check', function() {
                    var uniqueId = $.trim($('input[name="uniqueId"]').val());
                    if (!uniqueId) {
                        common.alert('GPS设备编号不能为空！', 'error');
                        return false;
                    }
                    if (!me.orgId) {
                        common.alert('所属机构不能为空！', 'error');
                        return false;
                    }
                    common.loading('show');
                    common.ajax(api.carManager.checkGPS, {
                        uniqueId: uniqueId,
                        orgId: me.orgId
                    }, function(res) {
                        var msg;
                        var rtStyle = {
                            'margin-left': 0,
                            'font-style': 'normal',
                            color: '#ff1e1e'
                        };
                        if (res.status === 'OK') {
                            msg = 'GPS设备校验成功！';
                            rtStyle.color = 'green';
                            $('.js_gps_text').css(rtStyle).html(msg);
                        } else {
                            msg = res.errorMsg || 'GPS设备校验失败！';
                            $('.js_gps_text').css(rtStyle).html(msg);
                            $('input[name="uniqueId"]').select().focus();
                        }
                        common.loading();
                    });
                })
                // 同步gps设备编号
                .on('click', '.js_updateGPS', function() {
                    if ($(this).hasClass('disabled')) {
                        return false;
                    }
                    me.getGPSNumerList();
                })
                .on('change', 'select[name="uniqueId"]', function() {
                    var li = $(this).children('option:selected');
                    $(':text[name="gpsBrand"]').val(li.attr('data-name'));
                    $(':text[name="gpsEndTime"]').val(li.attr('data-endtime'));
                    $(':text[name="simmcard"]').val(li.attr('data-simcard'));
                });
        }
    });

    exports.init = function(param) {
        new carAdd().init(param.vid, param.orgId);
    };
});