define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    var map = require('map');
    require('lodash');
    // 模板
    var tpls = {
        index: require('../../tpl/orderManager/index'),
        list: require('../../tpl/orderManager/list'),
        map: require('../../tpl/orderManager/map')
    };

    function orderList() {}
    $.extend(orderList.prototype, {
        init: function(param) {
            // 初始化查询条件参数
            this.getParams(param);
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.index)({ searchValue: this.searchParam }));
            // 初始化form
            common.layUIForm();
            // 控件初始化
            this.initControl();
            // 获取数据
            this.getData();
        },
        // 初始化控件
        initControl: function() {
            var me = this;
            this.event();
            common.initDateTime('input[name="start"]', 'Y-m-d H:i', false, 'yyyy-MM-dd h:m', true, false);
            common.initDateTime('input[name="end"]', 'Y-m-d H:i', false, 'yyyy-MM-dd h:m', true, false);
            setTimeout(function() {
                $('#OrderType').val(me.searchParam.OrderType);
                $('#OrderType').next().css('width', '200px');
            }, 100);
        },
        // 获取查询条件
        getParams: function(param) {
            this.sortParam = {};
            var newParams = {
                OrderNum: common.getElValue('input[name="OrderNum"]'), //订单编号
                start: common.getElValue('input[name="start"]'),
                end: common.getElValue('input[name="end"]'),
                phone: common.getElValue('input[name="phone"]'),
                plateNo: common.getElValue('input[name="plateNo"]'),
                OrderType: common.getElValue('select[name="OrderType"]')
            };
            if (newParams.start) newParams.start = newParams.start;
            if (newParams.end) newParams.end = newParams.end;
            if (!param) {
                newParams = {};
            }
            this.searchParam = common.getParams('orderManagerSearchParams', param, newParams, true);
        },
        getData: function() {
            var me = this;
            var param = this.searchParam;
            param = $.extend({}, param);
            // 将查询条件保存到localStorage里面
            common.setlocationStorage('orderManagerSearchParams', JSON.stringify(this.searchParam));
            common.loading('show');
            common.ajax(api.orderManager.list, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    $('#orderList > table > tbody').empty().html(template.compile(tpls.list)({
                        data: data.Page || []
                    }));
                    common.page(data.TotalCount, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.PageIndex = currPage;
                        common.changeHash('#orderManager/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.layMsg(msg);
                }
                common.loading();
            });
            //}
        },
        stopCar: function(truckId, confirmText, callback) {
            var me = this;
            common.layConfirm(confirmText, function() {
                common.loading('show', '数据正在处理中...');
                common.ajax(api.carManager.stop, {
                    truckIds: truckId
                }, function(res) {
                    if (res.status === 'OK') {
                        if (callback) {
                            callback();
                        } else {
                            me.getData();
                        }
                    } else {
                        var msg = res.errorMsg || '系统出错，请联系管理员！';
                        common.layMsg(msg);
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
            $('.panel-toolbar')
                //重置
                .on('click', '.js_list_reset', function() {
                    common.removeLocationStorage('orderManagerSearchParams'); // 车辆管理
                    me.getParams(false);
                    common.changeHash('#orderManager/index/', me.searchParam);
                })
                .on('click', '.js_list_search', function() {
                    me.getParams(true);
                    common.changeHash('#orderManager/index/', me.searchParam);
                });
            // 事件监听
            $('#main-content').on('click', '.js_list_add', function() {
                    common.changeHash('#carManager/edit');
                })
                //播放语音
                .on('click', '.js_list_playVoice', function() {
                    var audio = $(this).parent().find('audio');
                    audio[0].play();
                })
                //导出
                .on('click', '.js_list_export', function() {
                    me.exportCarList($(this));
                })
                //查看位置
                .on('click', '.js_list_detail', function() {
                    var lng = $(this).data('lng'); //lng是经度
                    var lat = $(this).data('lat'); //lat是纬度
                    common.layUI({
                        title: '位置查看',
                        area: '700',
                        content: tpls.map,
                        success: function() {
                            map.init('mymap', new BMap.Point(lng, lat), false, function(mymap) {
                                setTimeout(function() {
                                    var new_point = new BMap.Point(lng, lat);
                                    var marker = new BMap.Marker(new_point); // 创建标注
                                    mymap.addOverlay(marker); // 将标注添加到地图中
                                    mymap.panTo(new_point);
                                    mymap.centerAndZoom(new_point, 14); // 建树点坐标,初始化地图,设置中心点坐标和地图级别。
                                }, 500);
                            });
                        }
                    });
                });
        }
    });

    var _order = new orderList();

    exports.init = function(param) {
        _order.init(param);
    };
});