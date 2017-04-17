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
            });
        },
        // 获取查询条件
        getParams: function(param) {
            this.sortParam = {};
            var newParams = {
                OnlyOrgNo: common.getElValue(':hidden[name="OnlyOrgNo"]'), //所属机构
                VehicleType: common.getElValue('select[name="VehicleType"]'), //车辆类型
                orgName: common.getElValue('input[name="orgName"]'), //机构名称
                Condition: common.getElValue('input[name="Condition"]') //关键字
            };
            this.searchParam = common.getParams('carManagerParams', param, newParams, true);
        },
        getData: function() {
            var me = this;
            var param = this.searchParam;
            param = $.extend({}, param, this.sortParam ? this.sortParam : {});
            // 将查询条件保存到localStorage里面
            common.setlocationStorage('carManagerParams', JSON.stringify(this.searchParam));
            common.loading('show');
            common.ajax(api.carManager.list, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    if (data.Page.length) {
                        me.editPermission = common.getPermission(api.btnCodes.carManager.edit);
                        me.delPermission = common.getPermission(api.btnCodes.carManager.del);
                    }
                    $('#carList').empty().html(template.compile(tpls.carList)({
                        data: data.Page || [],
                        editPermission: me.editPermission,
                        delPermission: me.delPermission
                    }));
                    common.page(data.TotalCount, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.PageIndex = currPage;
                        common.changeHash('#carManager/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
                common.loading();
            });
        },
        //删除车辆
        deleteCar: function(truckId, confirmText, callback) {
            var me = this;
            common.confirm(confirmText, function() {
                common.loading('show', '数据正在处理中...');
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
                        var msg = res.errorMsg || '系统出错，请联系管理员！';
                        common.toast(msg);
                    }
                    common.loading();
                });
            });
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
            // 查询-事件监听
            $('.panel-toolbar').on('click', '.js_list_search', function() {
                    me.getParams(true);
                    common.changeHash('#carManager/index/', me.searchParam);
                })
                //重置
                .on('click', '.js_list_reset', function() {
                    common.removeLocationStorage('carManagerParams'); // 车辆管理
                    me.getParams(false);
                    common.changeHash('#carManager/index/', me.searchParam);
                });
            // 事件监听
            $('#main-content').on('click', '.js_list_add', function() {
                    common.changeHash('#carManager/edit');
                })
                //编辑车辆
                .on('click', '.js_list_edit', function() {
                    var tr = $(this).closest('tr');
                    var id = tr.data('truckid');
                    var orgId = tr.data('orgid');
                    common.changeHash('#carManager/edit/', { vid: id });
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
                //批量、单个删除车辆
                .on('click', '.js_list_delete', function() {
                    var truckId = $(this).closest('tr').data('truckid');
                    var confirmText = '';
                    if (truckId) {
                        confirmText = '确定要删除该车辆吗？';
                    } else {
                        var chks = $('.datatable-content table > tbody input[name="checkItem"]:checked');
                        if (chks.size() < 1) {
                            common.toast('请选择要删除的车辆！');
                            return false;
                        }
                        confirmText = '已选择&nbsp;<span class="red">' + chks.size() + '</span>&nbsp;辆车，是否对车辆进行删除？';
                        var array = [];
                        $.each(chks, function(i, item) {
                            array.push($(item).closest('tr').data('truckid'));
                        });
                        truckId = array.join(',');
                    }
                    me.deleteCar(truckId, confirmText);
                }).on('click', 'input[name="checkAll"]', function() {
                    var isChecked = $(this).is(':checked');
                    if (isChecked) {
                        $('.datatable-content table > tbody input[name="checkItem"]').prop('checked', isChecked);
                    } else {
                        $('.datatable-content table > tbody input[name="checkItem"]').removeAttr('checked');
                    }
                }).on('click', 'input[name="checkItem"]', function() {
                    var chks = $('.datatable-content table > tbody input[name="checkItem"]:checked').size();
                    var totalChks = $('.datatable-content table > tbody input[name="checkItem"]').size();
                    if (chks == totalChks) {
                        $('.datatable-header table > thead input[name="checkAll"]').prop('checked', true);
                    } else {
                        $('.datatable-header table > thead input[name="checkAll"]').removeAttr('checked');
                    }
                });
        }
    });

    exports.init = function(param) {
        new carList().init(param);
    };
});