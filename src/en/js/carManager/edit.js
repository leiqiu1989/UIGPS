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
        this.orgNo = null;
        this.vid = null;
        this.isEdit = null;
    };

    $.extend(carAdd.prototype, {
        init: function(vid, orgNo) {
            this.vid = vid;
            this.orgNo = orgNo || null;
            this.isEdit = !!vid;
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
            $('#main-content').empty().html(template.compile(tpls.add)({ title: (this.isEdit ? 'Edit' : 'Add'), data: this.obj }));
            this.initSelect(this.obj);
            this.validate();
            this.event();
        },
        initEditValue: function() {
            var me = this;
            common.ajax(api.carManager.detail, {
                Vid: this.vid,
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
                    // 机构
                    common.subordinateTree({
                        orgNo: data.Vehicle.OrgNo, // 机构编号
                        loadDevice: false,
                        loadPlateNum: false,
                        loadSIM: false,
                        timeType: null
                    });
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
                    'timezone': /^(-|\+)?\d+$/,
                    'carEngine': /^[0-9A-Za-z]{0,20}$/
                },
                errorMsg: {
                    'timezone': 'Only positive and negative integers (-12 to 12)',
                    'carEngine': 'Can only enter letters and numbers (length 0-20)'
                }
            });
        },
        submitForm: function() {
            var me = this;
            var url = this.isEdit ? api.carManager.update : api.carManager.submit;
            var params = common.getFormData('#frmaddCar');
            if (this.isEdit) {
                params.Vid = me.vid;
            }
            params.OnlyOrgNo = $('#txtSubordinate').data('orgNo');
            common.ajax(url, params, function(res) {
                if (res && res.status === 'SUCCESS') {
                    common.layMsg('Data is successful!');
                    common.changeHash('#carManager/index/', { back: true });
                } else {
                    var msg = res.errorMsg ? res.errorMsg : 'Server problem, please try again later';
                    common.layMsg(msg);
                }
            });
        },
        event: function() {
            var me = this;
            // add event listen
            $('#main-content').on('click', '.js_add_cancel', function() {
                common.changeHash('#carManager/index/', { back: true });
            });
        }
    });

    exports.init = function(param) {
        new carAdd().init(param.vid, param.orgNo);
    };
});