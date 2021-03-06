define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    // 模板
    var tpls = {
        carIndex: require('../../tpl/carManager/index'),
        carList: require('../../tpl/carManager/list')
    };

    var carList = function() {
        this.addPermission = null;
        this.editPermission = null;
        this.delPermission = null;
    };
    $.extend(carList.prototype, {
        init: function(param) {
            // 初始化查询条件参数
            this.getParams(param);
            // 渲染模板
            this.addPermission = common.getPermission(api.btnCodes.carManager.add);

            $('#main-content').empty().html(template.compile(tpls.carIndex)({ searchValue: this.searchParam, addPermission: this.addPermission }));
            // 控件初始化
            this.initControl();
            // 获取数据
            this.getData();
        },
        // 初始化控件
        initControl: function() {
            var me = this;
            this.event();
            common.tableSort(function(sortParam) {
                me.sortParam = sortParam;
                me.getData();
            });
            common.getSelect({
                url: api.carManager.carType,
                obj: $('#vehicleType'),
                key: ['PKey', 'PValue'],
                selected: me.searchParam.VehicleType,
                isall: true
            }, function() {
                // 机构            
                common.subordinateTree({
                    orgNo: me.searchParam.OnlyOrgNo, // 机构编号
                    loadDevice: false,
                    loadPlateNum: false,
                    loadSIM: false,
                    timeType: null
                });
                common.layUIForm();
            });
        },
        // 获取查询条件
        getParams: function(param, reset) {
            param = param || {};
            reset = reset || false;
            this.sortParam = {};
            var _param = null;
            if (reset || param.back) {
                _param = {
                    orgName: '',
                    OnlyOrgNo: common.getCookie('orgno'),
                    VehicleType: '',
                    Condition: ''
                }
            } else {
                if (param && _.isEmpty(param)) {
                    _param = {
                        orgName: common.getElValue('#txtSubordinate'),
                        OnlyOrgNo: $('#txtSubordinate').data('orgNo') || common.getCookie('orgno'),
                        VehicleType: common.getElValue('select[name="VehicleType"]'), //车辆类型                
                        Condition: common.getElValue('input[name="Condition"]') //关键字
                    }
                } else {
                    _param = param;
                }
            }
            this.searchParam = common.getParams(null, true, _param);
        },
        getData: function() {
            var me = this;
            var param = this.searchParam;
            param = $.extend({}, param, this.sortParam ? this.sortParam : {});
            common.loading('show');
            common.ajax(api.carManager.list, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    if (data.Page.length) {
                        me.editPermission = common.getPermission(api.btnCodes.carManager.edit);
                        me.delPermission = common.getPermission(api.btnCodes.carManager.del);
                    }
                    $('#carList > table > tbody').empty().html(template.compile(tpls.carList)({
                        data: data.Page || [],
                        editPermission: me.editPermission,
                        delPermission: me.delPermission
                    }));
                    common.page(data.TotalCount, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.PageIndex = currPage;
                        common.changeHash('#carManager/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || 'System error, please contact the administrator!';
                    common.layMsg(msg);
                }
                common.loading();
            });
        },
        //删除车辆
        deleteCar: function(truckId, confirmText, callback) {
            var me = this;
            common.layConfirm(confirmText, function() {
                common.loading('show', 'Data processing…');
                common.ajax(api.carManager.delete, {
                    ArrVid: truckId
                }, function(res) {
                    if (res.status === 'SUCCESS') {
                        if (callback) {
                            callback();
                        } else {
                            me.getData();
                        }
                    } else {
                        var msg = res.errorMsg || 'System error, please contact the administrator!';
                        common.layMsg(msg);
                    }
                    common.loading();
                });
            });
        },
        event: function() {
            var me = this;
            // 查询-事件监听
            $('.panel-toolbar').on('click', '.js_list_search', function() {
                me.getParams();
                common.changeHash('#carManager/index/', me.searchParam);
            }).on('click', '.js_list_reset', function() {
                common.removeLocationStorage('carManagerParams'); // 车辆管理
                me.getParams(null, true);
                common.changeHash('#carManager/index/', me.searchParam);
            });
            // 事件监听
            $('#main-content').off().on('click', '.js_list_add', function() {
                    common.changeHash('#carManager/edit');
                })
                //编辑车辆
                .on('click', '.js_list_edit', function() {
                    var tr = $(this).closest('tr');
                    var id = tr.data('truckid');
                    var orgno = tr.data('orgno');
                    common.changeHash('#carManager/edit/', { vid: id, orgNo: orgno });
                })
                .on('click', '.js_list_import', function() {
                    common.changeHash('#carManager/import');
                })
                .on('click', '.js_list_export', function() {
                    me.exportCarList($(this));
                })
                // //查看车辆详情：暂时不做
                // .on('click', '.js_list_detail', function() {
                //     var tr = $(this).closest('tr');
                //     var truckId = tr.data('truckid');
                //     var orgId = tr.data('orgid');
                //     var uniqueIds = tr.data('uniqueids');
                //     common.changeHash('#carManager/detail/', { truckId: truckId, orgId: orgId, uniqueIds: uniqueIds });
                // })
                //单个删除车辆
                .on('click', '.js_list_delete', function() {
                    var truckId = $(this).closest('tr').data('truckid');
                    var confirmText = '';
                    if (truckId) {
                        confirmText = 'Sure you to delete the vehicle?';
                    }
                    me.deleteCar(truckId, confirmText);
                });
        }
    });

    exports.init = function(param) {
        new carList().init(param);
    };
});