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
            this.initPage();
        },
        bindEditValue: function(data) {
            // 先绑定值，然后初始化编辑控件
            $.extend(this.obj, {
                Driver: data.Driver || {},
                Equipment: data.Equipment || {},
                Simcard: data.Simcard || {},
                Vehicle: data.Vehicle || {}
            });
            $('#main-content').empty().html(template.compile(tpls.add)({ title: (this.isEdit ? '编辑车辆' : '新增车辆'), data: this.obj }));
            this.initSelect(this.obj);
            this.validate();
            this.event();
        },
        initEditValue: function() {
            var me = this;
            common.ajax(api.carManager.detail, {
                Vid: this.truckId,
                orgId: this.orgId
            }, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    me.bindEditValue(data);
                }
            });
        },
        initPage: function() {
            var me = this;
            // 编辑
            if (this.isEdit) {
                this.initEditValue();
            } else {
                $('#main-content').empty().html(template.compile(tpls.add)({ title: '', data: this.obj }));
                this.initSelect(this.obj);
                this.validate();
                this.event();
            }
        },
        initSelect: function(data) {
            common.initDateTime('input[name="BuyDate"]', 'Y-m-d', false, false, false, new Date());
            common.initDateTime('input[name="STime"]', 'Y-m-d', false, false, false, new Date());
            common.initDateTime('input[name="ETime"]', 'Y-m-d', false, false, false, new Date());
            //获取车辆类型
            common.getSelect({
                url: api.carManager.carType,
                obj: $('select[name="VehicleType"]'),
                key: ['PKey', 'PValue'],
                selected: data.Vehicle.VehicleType
            });
            //获取车辆品牌
            common.getSelect({
                url: api.carManager.carBrand,
                obj: $('select[name="Brand"]'),
                key: ['PKey', 'PValue'],
                selected: data.Vehicle.Brand
            });
            //车牌颜色
            common.getSelect({
                url: api.carManager.plateNumberColor,
                obj: $('select[name="Color"]'),
                key: ['PKey', 'PValue'],
                selected: data.Vehicle.Color
            });
            //设备类型
            common.getSelect({
                url: api.carManager.equipmentType,
                obj: $('select[name="EquipmentTypeId"]'),
                key: ['PKey', 'PValue'],
                selected: data.Equipment.EquipmentTypeId
            });
            var timer = setInterval(function() {
                var vehicleTypeLen = $('select[name="VehicleType"] > option').length;
                var brandLen = $('select[name="Brand"] > option').length;
                var colorLen = $('select[name="Color"] > option').length;
                var equipmentLen = $('select[name="EquipmentTypeId"] > option').length;
                if (vehicleTypeLen && brandLen && colorLen && equipmentLen) {
                    clearInterval(timer);
                    common.layUIForm();
                }
            }, 100);
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
                    'timezone': /^(-|\+)?\d+$/
                },
                errorMsg: {
                    'timezone': '只能输入正数、负数的整数(-12到12)'
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
            if (me.orgId) {
                params.OnlyOrgNo = me.orgId;
            }
            common.ajax(url, params, function(res) {
                if (res && res.status === 'SUCCESS') {
                    common.layMsg('数据操作成功!');
                    common.changeHash('#carManager/index');
                } else {
                    var msg = res.errorMsg ? res.errorMsg : '服务器问题，请稍后重试';
                    common.layMsg(msg);
                }
            });
        },
        event: function() {
            var me = this;
            // 所属机构事件监听
            common.listenOrganization(function(orgId, orgName) {
                me.orgId = orgId;
            });
            // add event listen
            $('#main-content').on('click', '.js_add_cancel', function() {
                common.changeHash('#carManager/index');
            });
        }
    });

    exports.init = function(param) {
        new carAdd().init(param.vid, param.orgId);
    };
});