define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    var map = require('map');

    // 模板
    var tpls = {
        detail: require('../../tpl/carManager/detail'),
        historyLocation: require('../../tpl/carManager/historyLocation'),
        lastLocation: require('../../tpl/carManager/lastLocation'),
    };

    var carDetail = function() {
        // 定义变量
        this.glo_uniqueIds = null;
        this.glo_orgId = null;
        this.glo_truckId = null;
        this.glo_plateNumber = null;
    };

    $.extend(carDetail.prototype, {
        initMap: function() {
            var me = this;
            map.init('mapContainer', null, false, function() {
                setTimeout(function() {
                    me.getHisotryLocation();
                }, 1000);
            });
        },
        //uniqueIds 可能为null
        init: function(truckId, orgId, uniqueIds) {
            var me = this;
            if (truckId) {
                this.glo_uniqueIds = uniqueIds;
                this.glo_orgId = orgId;
                this.glo_truckId = truckId;
                var url = api.carManager.detail;
                var param = {
                    truckId: truckId,
                    orgId: orgId
                };
                common.ajax(url, param, function(res) {
                    if (res.status === 'OK') {
                        var carInfo = res.content;
                        var data = {
                            carInfo: carInfo
                        };
                        me.glo_plateNumber = carInfo.plateNumber;
                        $('#main-content').empty().html(template.compile(tpls.detail)(data));
                        me.initMap();
                        me.event();
                        me.initControl();
                        me.getlastLocation();
                    } else {
                        common.layMsg('System error, please contact the administrator!');
                        common.changeHash('#carManager/index');
                    }
                });
            }
        },
        renderLocation: function(data) {
            data = data || {
                locationTime: '',
                speed: '',
                directionName: '',
                status: '',
                alarmDesc: '',
                mileage: '',
                totalMileage: '',
                location: ''
            };
            $('#lastLocation').empty().html(template.compile(tpls.lastLocation)({
                location: data
            }));
        },
        getlastLocation: function() {
            var me = this;
            if (this.glo_uniqueIds) {
                common.loading('show');
                common.ajax(api.carManager.lastLocation, {
                    uniqueIds: me.glo_uniqueIds
                }, function(res) {
                    if (res.status === 'OK') {
                        var location = null;
                        var content = res.content;
                        if (content.length > 0) {
                            location = content[0];
                        }
                        me.renderLocation(location);
                        var stateTxt = (!location || !location.state) ? '' : (location.state == 1) ? '在线' : (location.state == 2) ? '离线' : '';
                        $('.js_detail_state').text(stateTxt);
                    } else {
                        var msg = res.errorMsg || 'System error, please contact the administrator!';
                        common.layMsg(msg);
                    }
                    common.loading();
                });
            } else {
                me.renderLocation();
            }
        },
        drawCarTrack: function(historyData, alarmData) {
            //初始化属性
            map.reset();
            if (historyData && historyData.length > 0) {
                // 转化为地图点
                var mapPoints = map.generateMapPoints(historyData);
                // 统计数据
                map.summerPoint(historyData);
                // 添加曲线
                map.addTrackLine(mapPoints, this.glo_plateNumber);
                // 设置中心点
                map.setCenterAndZoom(mapPoints);
            }
            if (alarmData && alarmData.length > 0) {
                // 设置报警点
                //map.addAlarm(alarmData);
            }
        },
        getDateParams: function() {
            var params = {};
            var startTime = $('#startTime').val();
            var endTime = $('#endTime').val();
            if ((startTime || endTime)) {
                if (common.checkTime(endTime, startTime, 3)) {
                    params.beginTime = startTime.replace(/\//g, "-") + ':00';
                    params.endTime = endTime.replace(/\//g, "-") + ':00';
                    params.uniqueId = this.glo_uniqueIds;
                } else {
                    return false;
                }
            } else {
                params.uniqueId = this.glo_uniqueIds;
            }
            return params;
        },
        // 获取车辆行程轨迹数据
        getHisotryLocation: function() {
            var me = this;
            var historyUrl = api.carManager.historyLocation;
            if (!this.glo_uniqueIds) {
                common.layMsg('Parameter incorrect,failed to get the vehicle trajectory data!');
                return false;
            } else {
                var returnValue = this.getDateParams();
                if (!returnValue) {
                    return false;
                }
                var historyParams = returnValue;

                common.loading('show');
                common.getBundle(common.simpleAjax(historyUrl, historyParams)).done(function(historyResp) {
                    if (historyResp.status === 'OK') {
                        var historyData = historyResp.content || [];
                        $('#historyLocation').empty().html(template.compile(tpls.historyLocation)({
                            data: historyData
                        }));
                        me.drawCarTrack(historyData, []);
                    } else {
                        var msg = historyResp.errorMsg || 'System error, please contact the administrator!';
                        common.layMsg(msg);
                    }
                    common.loading();
                });
            }
        },
        initControl: function() {
            common.initBetweenDateTime('#startTime', '#endTime');
        },
        sendGPS: function(type) {
            var me = this;
            var url = api.carManager.sendGPS;
            if (!this.glo_uniqueIds) {
                common.layMsg('GPS device IMEI is abnormal,can not proceed operation!');
                return false;
            }
            var param = {
                uniqueId: me.glo_uniqueIds
            };
            if (type === 'ET-08BD') {
                param.avlType = 1;
                param.cmdType = 0;
            } else if (type === 'ET-08S') {
                param.avlType = 0;
            } else {
                common.layMsg('Device type does not conform, can not send!');
                return false;
            }
            common.loading('show');
            common.ajax(url, param, function(res) {
                if (res.status === 'OK') {
                    common.layMsg('GPS sent successfully!', 'success');
                } else {
                    var msg = res.errorMsg || 'System error, please contact the administrator!';
                    common.layMsg(msg);
                }
                common.loading();
            });
        },
        stopCar: function(truckId, confirmText, callback) {
            var me = this;
            common.confirm(confirmText, function() {
                common.loading('show', 'Data processing…');
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
                        var msg = res.errorMsg || 'System error, please contact the administrator!';
                        common.layMsg(msg);
                    }
                    common.loading();
                });
            });
        },
        event: function() {
            var me = this;
            $('#carDetail')
                .on('click', '.js_detail_back', function() {
                    common.changeHash('#carManager/index');
                })
                .on('click', '.js_detail_send', function() {
                    var gpsType = $(this).data('type');
                    me.sendGPS(gpsType);
                })
                .on('click', '.js_detail_edit', function() {
                    common.changeHash('#carManager/edit/', { truckId: me.glo_truckId, orgId: me.glo_orgId });
                })
                .on('click', '.js_detail_stop', function() {
                    me.stopCar(me.glo_truckId, 'Sure to disable the vehicle?', function() {
                        common.layMsg('Data is successful!');
                    });
                })
                .on('click', '.js_detail_refresh', function() {
                    me.getlastLocation();
                })
                .on('click', 'a[data-toggle="tab"]', function() {
                    var _li = $(this).parent();
                    $(_li).addClass('active');
                    $(_li).siblings().removeClass('active');
                    var _id = $(_li).children('a').attr('navId');
                    $(_id).addClass('active');
                    $(_id).siblings().removeClass('active');
                }).on('click', '.js_detail_search', function() {
                    me.getHisotryLocation();
                });
        }
    });

    var _carDetail = new carDetail();

    exports.init = function(param) {
        _carDetail.init(param.truckId, param.orgId, param.uniqueIds);
    };
});