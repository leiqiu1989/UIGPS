define(function(require, exports, module) {
    'use strict';

    require('lodash');
    require('markerwithlabel');
    var common = require('common');

    var map = function() {
        // 公共变量
        this._map = null;
        this.points = []; // 全部点        
        this.monitorMarks = []; //车辆监控（存储标记点对象,对应下方监控车辆列表,用来绑定联动点击事件）
        this.monitorInfoWindows = []; // 车辆监控（存储车辆监控infoWindows）
        this.monitorSelectCar = null; //车辆监控（选择车的el）
        this.trackLine = null; // 轨迹回放line
        this.startMark = null; // 轨迹回放start
        this.endMark = null; // 轨迹回放end
        this.mouseMove_marker = null; // 轨迹回放（鼠标放在轨迹上显示的轨迹点）
        this.mouseMoveClick_marker = null; //轨迹回放（鼠标放在轨迹上显示的轨迹点点击）
        this.trackInfoWindow = null; // 轨迹回放（点击弹出infowindows）
        this.zoom = 10;
    };

    $.extend(map.prototype, {
        reset: function() {
            this._map = null;
            this.clearData();
        },
        clearData: function() {
            if (this.monitorMarks.length > 0) {
                for (var j = 0; j < this.monitorMarks.length; j++) {
                    this.monitorMarks[j].setMap(null);
                }
            }
            this.points = [];
            this.monitorMarks = [];
            this.monitorInfoWindows = [];
            this.monitorSelectCar = null;
            this.mouseMove_marker = null;
            this.trackLine = null;
            this.startMark = null;
            this.endMark = null;
            this.mouseMoveClick_marker = null;
            this.trackInfoWindow = null;
            this.zoom = 10;
        },
        init: function(el) {
            var me = this;
            this.reset();
            var mapProp = {
                center: new google.maps.LatLng(39.9, 116.3),
                zoom: 5,
                panControl: true,
                zoomControl: false,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById(el), mapProp);
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    map.setZoom(10);
                    map.setCenter(pos);
                }, function(error) {
                    switch (error.code) {
                        case error.TIMEOUT:
                            common.layAlert("A timeout occured! Please try again!");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            common.layAlert('We can\'t detect your location. Sorry!');
                            break;
                        case error.PERMISSION_DENIED:
                            common.layAlert('Please allow geolocation access for this to work.');
                            break;
                        case error.UNKNOWN_ERROR:
                            common.layAlert('An unknown error occured!');
                            break;
                    }
                });
            } else {
                common.layAlert('The browser does not support access to geographic location!')
            }
            this._map = map;
        },
        // 车辆监控-弹出框
        getCarMonitorInfoWindow: function(data) {
            var status = '';
            if (data.IsOnline === 0) {
                status = 'Offline';
            } else if (data.Status.indexOf('ACC开') > -1 || data.IsOnline == 1) {
                status = 'Engine Start';
            } else if (data.Status.indexOf('ACC关') - 1) {
                status = 'ACC OFF';
            } else {
                status = 'Unknow Status';
            }
            return "<div class='point_info_title'>" +
                "<div class='point_title_left'>License Plate Number：" + data.PlateNo + "</div>" +
                "<div style='display:inline-block'>" + data.GpsTime + "</div>" +
                "</div>" +
                "<div class='point_info_row'>" +
                "<div class='point_info_left'>Vehicle Status：" + status + "</div>" +
                "<div class='point_info_right'>Speed：" + data.Speed + "km/h</div>" +
                "</div>" +
                "<div class='point_info_row'>" +
                "<div class='point_info_left'>Parking Duration：" + 0 + "</div>" +
                "<div class='point_info_right'>Direction：" + data.DirectionDesc + "</div>" +
                "</div>" +
                (data.AlarmInfo ? "<div class='point_info_row'>" +
                    "<div class='point_info_right'>Vehicle Alarm：" + data.AlarmInfo + "</div></div>" : "") +
                "</div>" +
                "<div class='point_info_addr ellipsis' title='" + data.Location + "'>Location：" + data.Location + "</div>" +
                "<div class='point_btn'>" +
                "<div class='point_btn_info br' onclick='showVehicleInfo(" + data.Vid + ")'>Detailed Vehicle Info</div>" +
                "<div class='point_btn_info js-car-track' onclick=\"showVehicleTrack('" + data.Vid + "','" + data.PlateNo + "')\">History Playback</div>" +
                "</div>";
        },
        getMap: function() {
            return this._map;
        },
        getIconUrl: function(degrees, isOnline) {
            var iconUrl = '';
            var baseUrl = window.DOMAIN + '/img/map/';
            switch (degrees) {
                case 0:
                    iconUrl = isOnline ? 'green1.png' : 'gray1.png';
                    break;
                case 45:
                    iconUrl = isOnline ? 'green2.png' : 'gray2.png';
                    break;
                case 90:
                    iconUrl = isOnline ? 'green3.png' : 'gray3.png';
                    break;
                case 135:
                    iconUrl = isOnline ? 'green4.png' : 'gray4.png';
                    break;
                case 180:
                    iconUrl = isOnline ? 'green5.png' : 'gray5.png';
                    break;
                case 225:
                    iconUrl = isOnline ? 'green6.png' : 'gray6.png';
                    break;
                case 270:
                    iconUrl = isOnline ? 'green7.png' : 'gray7.png';
                    break;
                case 315:
                    iconUrl = isOnline ? 'green8.png' : 'gray8.png';
                    break;
            }
            return baseUrl + iconUrl;
        },
        // 添加鼠标绘制类
        addDrawing: function(callback) {
            var me = this;
            var drawingManager = new google.maps.drawing.DrawingManager({
                drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: ['rectangle']
                },
                rectangleOptions: {
                    fillColor: '#ffff00',
                    fillOpacity: 0.6,
                    strokeWeight: 3,
                    clickable: false,
                    editable: true,
                    zIndex: 1
                }
            });
            drawingManager.setMap(this._map);
            google.maps.event.addListener(drawingManager, 'rectanglecomplete', function(rectangle) {
                var maxLng = 0,
                    maxLat = 0,
                    minLng = 0,
                    minLat = 0;
                var bounds = rectangle.getBounds();
                minLat = bounds.f.f;
                maxLat = bounds.f.b;
                minLng = bounds.b.b;
                maxLng = bounds.b.f;
                if (typeof(callback) == "function") {
                    callback({ MinLng: minLng, MinLat: minLat, MaxLng: maxLng, MaxLat: maxLat });
                }
                rectangle.setMap(null)
            });
        },
        // 车辆监控-添加覆盖物
        addMonitorMark: function(data) {
            var me = this;
            var iconUrl = this.getIconUrl(data.Degrees, data.IsOnline);
            var currentPoint = new google.maps.LatLng(data.Lat, data.Lng);
            var icon = { url: iconUrl, size: new google.maps.Size(30, 30) };
            var marker = this.addMarkerLabel(currentPoint, data.PlateNo, icon);
            // 创建信息窗口对象
            var infoWindow = new google.maps.InfoWindow({
                content: me.getCarMonitorInfoWindow(data)
            });
            google.maps.event.addListener(marker, 'click', function() {
                for (var i = 0; i < me.monitorInfoWindows.length; i++) {
                    me.monitorInfoWindows[i].close();
                }
                me._map.panTo(currentPoint);
                //将车辆列表中的记录设为选中状态
                me.monitorSelectCar = "tr_monitor_" + data.PlateNo;
                var el = $('tr[data-flag="' + me.monitorSelectCar + '"]');
                $("#carMonitorList tbody tr").removeClass("monitor-active");
                el.addClass("monitor-active");
                //滚动到列所在位置
                $("#carMonitorList").scrollTop(
                    $(el).offset().top - $("#carMonitorList").offset().top + $("#carMonitorList").scrollTop()
                );
                //点击地图弹窗的关闭按钮时，移除被监控车辆
                google.maps.event.addListener(infoWindow, "closeclick", function(e) {
                    me.monitorSelectCar = null;
                    $("#carMonitorList tbody tr").removeClass("monitor-active");
                });
                infoWindow.open(me._map, marker);
            });
            this.monitorMarks.push(marker);
            this.monitorInfoWindows.push(infoWindow);
        },
        addMarkerLabel: function(latlng, content, icon) {
            var me = this;
            var marker = new MarkerWithLabel({
                position: latlng,
                map: me._map,
                draggable: false,
                raiseOnDrag: false,
                labelContent: content,
                labelAnchor: new google.maps.Point(38, 0),
                labelClass: "labels",
                labelStyle: { opacity: 1, border: '1px solid #000', color: '#333', backgroundColor: "#fff", padding: "5px" },
                icon: icon
            });
            return marker;
        },
        // 车辆监控（列表和地图联动）
        bindMonitorListEvent: function(data) {
            var me = this;
            $('#carMonitorList tbody tr').on('click', function() {
                var index = $(this).index();
                var scrollTop = $("#carMonitorList").scrollTop();
                me._map.setCenter(me.monitorMarks[index].getPosition());
                google.maps.event.trigger(me.monitorMarks[index], 'click');
                if (scrollTop) {
                    $("#carMonitorList").scrollTop(scrollTop);
                }
            });
        },
        // 转化为json数组对象
        transArrayPoint: function(data) {
            var arrayPoints = [];
            $.each(data, function(index, item) {
                var point = { lat: item.Lat, lng: item.Lng };
                arrayPoints.push(point);
            });
            return arrayPoints;
        },
        // 轨迹回放drving
        drivingTrackLine: function(data, callback) {
            var me = this;
            // 首个点时间
            $('.track-time').text(data[0].GpsTime);
            // 转化为json数组对象
            var arrayPoints = me.transArrayPoint(data);
            // 赋值到points
            me.points = data;
            // 添加曲线
            me.addTrackLine(arrayPoints);
            // 设置中心点
            //me.setCenterAndZoom(mapPoints);
            if (callback) callback();
        },
        // 清除轨迹回放mark
        clearTrackMarks: function() {
            if (this.trackLine) {
                this.trackLine.setMap(null);
            }
            if (this.startMark) {
                this.startMark.setMap(null);
            }
            if (this.endMark) {
                this.endMark.setMap(null);
            }
        },
        getMapZoom: function(maxLat, maxLng, minLat, minLng) {
            var EARTH_RADIUS = 6378137.0; //单位M
            var PI = Math.PI;

            function getRad(d) {
                return d * PI / 180.0;
            }

            function getGreatCircleDistance(maxLat, maxLng, minLat, minLng) {
                var radMaxLat = getRad(maxLat);
                var radMinlat = getRad(minLat);
                var a = radMaxLat - radMinlat;
                var b = getRad(maxLng) - getRad(minLng);
                var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radMaxLat) * Math.cos(radMinlat) * Math.pow(Math.sin(b / 2), 2)));
                s = s * EARTH_RADIUS;
                s = Math.round(s * 10000) / 10000.0;
                return s;
            }
            var _distance = getGreatCircleDistance(maxLat, maxLng, minLat, minLng);

            function getZoom(_distance) {
                var zoom = ["50", "100", "200", "500", "1000", "2000", "5000", "10000", "20000", "25000", "50000", "100000", "200000", "500000", "1000000", "2000000", "5000000"]; //19到2
                var zoomLength = zoom.length;
                if (zoom[zoomLength - 1] < _distance) {
                    return 3;
                }

                for (var i = 0, zoomLen = zoomLength; i < zoomLen; i++) {
                    if (zoom[i] - _distance > 0) {
                        return 19 - i + 1;
                    }
                }
            }
            var _zoom = getZoom(_distance);
            return _zoom;
        },
        // 添加轨迹回放折线
        addTrackLine: function(arrayPoints) {
            var me = this;
            // 移除所有标注
            this.clearTrackMarks();
            var maxLng = 0.0,
                minLng = 0.0,
                maxLat = 0.0,
                minLat = 0.0;
            this.trackLine = new google.maps.Polyline({
                path: arrayPoints,
                geodesic: true,
                strokeColor: '#0000FF',
                strokeOpacity: 2.0,
                strokeWeight: 4,
                visible: true
            });
            for (var i = 0; i < arrayPoints.length; i++) {
                var value = arrayPoints[i];
                //获取最大（小）的经纬度值，用于地图缩放
                if (value.lng > maxLng || maxLng == 0)
                    maxLng = value.lng;
                if (value.lng < minLng || minLng == 0)
                    minLng = value.lng;
                if (value.lat > maxLat || maxLat == 0)
                    maxLat = value.lat;
                if (value.lat < minLat || minLat == 0)
                    minLat = value.lat;
            }
            this.trackLine.setMap(this._map);
            this.zoom = this.getMapZoom(maxLat, maxLng, minLat, minLng);
            var cenLng = (parseFloat(maxLng) + parseFloat(minLng)) / 2;
            var cenLat = (parseFloat(maxLat) + parseFloat(minLat)) / 2;
            var centerPoint = new google.maps.LatLng(cenLat, cenLng);
            this._map.panTo(centerPoint);
            this._map.setZoom(this.zoom);
            //绘制开始点
            this.startMark = new google.maps.Marker({
                position: new google.maps.LatLng(arrayPoints[0].lat, arrayPoints[0].lng),
                map: me._map,
                icon: {
                    url: window.DOMAIN + "/img/start.png",
                    size: new google.maps.Size(26, 40),
                    origin: new google.maps.Point(0, 0)
                }
            });
            //绘制结束点
            this.endMark = new google.maps.Marker({
                position: new google.maps.LatLng(arrayPoints[arrayPoints.length - 1].lat, arrayPoints[arrayPoints.length - 1].lng),
                map: me._map,
                icon: {
                    url: window.DOMAIN + "/img/end.png",
                    size: new google.maps.Size(26, 40),
                    origin: new google.maps.Point(0, 0)
                }
            });
            // 折线事件绑定
            google.maps.event.addListener(this.trackLine, 'mousemove', function(e) {
                var lng = e.latLng.lng();
                var lat = e.latLng.lat();
                var distanceArray = [];
                for (var i = 0, l = me.points.length; i < l; i++) {
                    var distance = Math.abs(me.points[i].Lat - lat) + Math.abs(me.points[i].Lng - lng);
                    distanceArray.push(distance);
                }
                var index = distanceArray.indexOf(Math.min.apply(Math, distanceArray));
                me.addMarker(me.points[index]);
            });
            google.maps.event.addListener(this.trackLine, 'mouseout', function(e) {
                if (me.mouseMove_marker) {
                    me.mouseMove_marker.setMap(null);
                }
            });
        },
        // 鼠标悬浮，添加覆盖物
        addMarker: function(point) {
            var me = this;
            var latlng = new google.maps.LatLng(point.Lat, point.Lng);
            if (this.mouseMove_marker) {
                this.mouseMove_marker.setMap(null);
            }
            var content = "时间:" + point.GpsTime + "<br/>速度:" + point.Speed + "km/h";
            var marker = this.addMarkerLabel(latlng, content, {
                url: window.DOMAIN + "/img/icon_pathway.png",
                size: new google.maps.Size(16, 16),
                origin: new google.maps.Point(0, 0)
            });
            this.mouseMove_marker = marker;
            google.maps.event.addListener(marker, 'click', function() {
                me.clickMarker(point);
            });
        },
        // 鼠标移动,点击弹出详情
        clickMarker: function(point) {
            var me = this;
            if (this.mouseMoveClick_marker) {
                this.mouseMoveClick_marker.setMap(null);
            }
            this.mouseMove_marker.setMap(null);
            var clickedMarker = new google.maps.Marker({
                position: new google.maps.LatLng(point.Lat, point.Lng),
                map: me._map,
                icon: {
                    url: window.DOMAIN + "/img/icon_pathway.png",
                    size: new google.maps.Size(16, 16),
                    origin: new google.maps.Point(0, 0)
                }
            });
            var sContent = "<div class='mapCarItem'>车牌：" + point.PlateNo + "</div>" + "<div class='mapCarItem'>时间：" + point.GpsTime + "</div>" + "<div class='mapCarItem'>速度：" + point.Speed + "km/h</div>" + "<div class='mapCarItem'><div class='pull-left'>位置：</div><div style='margin-left:36px;max-height: 37px;overflow: hidden;' title='" + point.Location + "'>" + point.Location + "</div></div>";
            if (this.trackInfoWindow) {
                this.trackInfoWindow.close();
                this.trackInfoWindow = null;
            }
            this.trackInfoWindow = new google.maps.InfoWindow({
                content: sContent
            }); // 创建信息窗口对象
            google.maps.event.addListener(this.trackInfoWindow, "closeclick", function() {
                clickedMarker.setMap(null);
            });
            this.trackInfoWindow.open(me._map, clickedMarker);
        }
    });
    var _map = new map();

    module.exports = _map;

});