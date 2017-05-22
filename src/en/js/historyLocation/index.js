define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var validate = require('validate');
    var common = require('common');
    var api = require('api');
    var map = require('google');
    require('draw');
    require('lodash');

    // 模板
    var tpls = {
        index: require('../../tpl/historyLocation/index'),
        list: require('../../tpl/historyLocation/list')
    };

    var historyLocation = function() {
        this.drawManager = null;
        this.bounds = [];
        this.overlays = [];
    };
    $.extend(historyLocation.prototype, {
        init: function(param) {
            var me = this;
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.index)());
            // 控件初始化
            this.initControl();
            // 地图初始化
            map.init('historyMap');
            setTimeout(function() {
                me.drawManagerRectangle();
                // 获取查询参数
                me.getParams();
            }, 500);
            // 事件绑定
            this.event();
        },
        // 获取保存参数
        getParams: function() {
            var me = this;
            var params = common.getlocationStorage('historyLocationParams');
            if (params) {
                params = JSON.parse(params);
                $('.js-firstPoint').eq(0).val(params.RFMinLng);
                $('.js-firstPoint').eq(1).val(params.RFMinLat);
                $('.js-firstPoint').eq(2).val(params.RFMaxLng);
                $('.js-firstPoint').eq(3).val(params.RFMaxLat);
                $('.js-secondPoint').eq(0).val(params.RTMinLng || '');
                $('.js-secondPoint').eq(1).val(params.RTMinLat || '');
                $('.js-secondPoint').eq(2).val(params.RTMaxLng || '');
                $('.js-secondPoint').eq(3).val(params.RTMaxLat || '');
                $('input[name="startDate"]').val(params.STime || '');
                $('input[name="endDate"]').val(params.ETime || '');
                // 画矩形                
                var rectangle = params.rectangle;
                for (var i = 0; i < rectangle.length; i++) {
                    var lngs = [],
                        lats = [];
                    var bounds = rectangle[i];
                    if (bounds && !_.isArray(bounds)) {
                        var rectageObj = new google.maps.Rectangle({
                            strokeColor: '#000000',
                            strokeOpacity: 0.8,
                            strokeWeight: 3,
                            fillColor: '#ffff00',
                            fillOpacity: 0.6,
                            map: map._map,
                            bounds: bounds
                        });
                        lngs.push(bounds.north);
                        lngs.push(bounds.south);
                        lats.push(bounds.east);
                        lats.push(bounds.west);
                        var maxLng = _.max(lngs);
                        var maxLat = _.max(lats);
                        var minLng = _.min(lngs);
                        var minLat = _.min(lats);
                        me.overlays.push({
                            bounds: bounds,
                            rectangle: rectageObj,
                            maxLng: maxLng,
                            maxLat: maxLat,
                            minLng: minLng,
                            minLat: minLat
                        });
                        me.bounds.push(bounds)
                    }
                }
                this.getData();
            }
        },
        // 鼠标绘制
        drawManagerRectangle: function() {
            var me = this;
            var drawingManager = new google.maps.drawing.DrawingManager({
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_RIGHT,
                    drawingModes: ['rectangle']
                },
                rectangleOptions: {
                    fillColor: '#ffff00',
                    fillOpacity: 0.6,
                    strokeWeight: 3,
                    clickable: false,
                    editable: false,
                    zIndex: 1
                }
            });
            //实例化鼠标绘制工具            
            drawingManager.setMap(map._map);
            google.maps.event.addListener(drawingManager, 'rectanglecomplete', function(rectangle) {
                var maxLng = 0,
                    maxLat = 0,
                    minLng = 0,
                    minLat = 0;
                var bounds = rectangle.getBounds();
                var northEastLatLng = bounds.getNorthEast();
                var southWestLatLng = bounds.getSouthWest();
                var northEastLat = northEastLatLng.lat();
                var northEastLng = northEastLatLng.lng();
                var southWestLat = southWestLatLng.lat();
                var southWestLng = southWestLatLng.lng();
                var lngs = [northEastLng, southWestLng];
                var lats = [northEastLat, southWestLat];
                var maxLng = _.max(lngs);
                var maxLat = _.max(lats);
                var minLng = _.min(lngs);
                var minLat = _.min(lats);
                var boundsObj = {
                    north: northEastLat,
                    south: southWestLat,
                    east: northEastLng,
                    west: southWestLng
                }
                me.overlaycomplete(minLat, maxLat, minLng, maxLng, boundsObj, rectangle);
            });
            this.drawManager = drawingManager;
        },
        overlaycomplete: function(minLat, maxLat, minLng, maxLng, boundsObj, rectangleObj) {
            if (this.overlays.length == 2) {
                var removeLay = this.overlays.splice(0, 1);
                removeLay[0].rectangle.setMap(null);
            }
            this.overlays.push({
                bounds: boundsObj,
                rectangle: rectangleObj,
                maxLng: maxLng,
                maxLat: maxLat,
                minLng: minLng,
                minLat: minLat
            });
            this.setPointValue(this.overlays);
        },
        setPointValue: function(overlays) {
            var firstItem = null,
                secondItem = null,
                firstEl = null,
                secondEl = null,
                len = overlays.length;
            if (len == 1) {
                firstItem = overlays[0];
                firstEl = '.js-firstPoint';
            } else if (len == 2) {
                firstItem = overlays[0];
                secondItem = overlays[1];
                firstEl = '.js-firstPoint';
                secondEl = '.js-secondPoint';
            } else {
                common.layMsg('Tag data exception!');
                return false;
            }
            $(firstEl).eq(0).val(firstItem.minLng.toFixed(6));
            $(firstEl).eq(1).val(firstItem.minLat.toFixed(6));
            $(firstEl).eq(2).val(firstItem.maxLng.toFixed(6));
            $(firstEl).eq(3).val(firstItem.maxLat.toFixed(6));
            if (secondEl) {
                $(secondEl).eq(0).val(secondItem.minLng.toFixed(6));
                $(secondEl).eq(1).val(secondItem.minLat.toFixed(6));
                $(secondEl).eq(2).val(secondItem.maxLng.toFixed(6));
                $(secondEl).eq(3).val(secondItem.maxLat.toFixed(6));
            }
            this.bounds = [];
            // 保存每个矩形的点(最多两个矩形)
            for (var i = 0; i < len; i++) {
                this.bounds.push(overlays[i].bounds);
            }
        },
        clearAllData: function() {
            var me = this;
            common.removeLocationStorage('historyLocationParams');
            $('.js-firstPoint,.js-secondPoint').val('');
            for (var i = 0; i < this.overlays.length; i++) {
                me.overlays[i].rectangle.setMap(null);
            }
            $('#historyLocationList > table > tbody').empty().html(template.compile(tpls.list)({
                data: []
            }));
            this.bounds = [];
            this.overlays = [];
            this.initControl();
        },
        initControl: function() {
            var maxDate = new Date().format('yyyy-MM-dd h:m');
            common.initDateTime('input[name="startDate"]', null, true, 'yyyy-MM-dd 00:00', true, null, maxDate);
            common.initDateTime('input[name="endDate"]', null, true, null, true, null, maxDate);
        },
        event: function() {
            var me = this;
            $('#main-content').off()
                // 清除覆盖物
                .on('click', '.js-clear-overlay', function() {
                    me.clearAllData();
                })
                .on('click', '.js-search', function() {
                    me.getData();
                }).on('click', '.js_track_replay', function() {
                    var id = $(this).data('id');
                    var plateNo = $(this).data('plate');
                    var ftime = $(this).data('ftime');
                    var ttime = $(this).data('ttime');
                    common.changeHash('#carMonitor/track/', { id: id, plateNo: plateNo, ftime: ftime, ttime: ttime });
                });
        },
        getData: function() {
            var me = this;
            var startDate = $('input[name="startDate"]').val();
            var endDate = $('input[name="endDate"]').val();
            if (!this.overlays.length) {
                common.layMsg('Please make area on the map！');
                return false;
            }
            if (common.checkTime(endDate, startDate)) {
                common.loading('show');
                var params = {
                    STime: startDate,
                    ETime: endDate
                };
                var len = this.overlays.length;
                var firstPoint = null,
                    secondPoint = null;
                if (len > 0 && len <= 2) {
                    firstPoint = this.overlays[0];
                    if (len == 2) {
                        secondPoint = this.overlays[1];
                    }
                    params = $.extend(params, {
                        RFMinLng: firstPoint.minLng.toFixed(6),
                        RFMinLat: firstPoint.minLat.toFixed(6),
                        RFMaxLng: firstPoint.maxLng.toFixed(6),
                        RFMaxLat: firstPoint.maxLat.toFixed(6)
                    });
                    if (secondPoint) {
                        params = $.extend(params, {
                            RTMinLng: secondPoint.minLng.toFixed(6),
                            RTMinLat: secondPoint.minLat.toFixed(6),
                            RTMaxLng: secondPoint.maxLng.toFixed(6),
                            RTMaxLat: secondPoint.maxLat.toFixed(6)
                        });
                    }
                } else {
                    common.layMsg('Abnormal parameters, please contact the administrator!');
                    return false;
                }
                // 查询参数保存
                var searchParams = $.extend(params, { rectangle: this.bounds }); // 矩形原始点
                common.setlocationStorage('historyLocationParams', JSON.stringify(searchParams));
                common.ajax(api.historyQuery, params, function(res) {
                    if (res && res.status === 'SUCCESS') {
                        var data = res.content;
                        $('#historyLocationList').empty().html(template.compile(tpls.list)({
                            data: data || []
                        }));
                    } else {
                        var msg = res.errorMsg || 'System error, please contact the administrator!';
                        common.layMsg(msg);
                    }
                    common.loading();
                });
            }
        }
    });

    exports.init = function(param) {
        new historyLocation().init(param);
    };
});