define(function(require, exports, module) {
    'use strict';

    require('eventWrapper');
    require('draw');
    require('lodash');
    var common = require('common');

    var map = function() {
        // 公共变量
        this._map = null;
        this.centerPoint = null;
        this.isLoaded = null; // 是否加载完毕
        this.overView = null; //鹰眼
        this.mouseMove_marker = null; //鼠标放在轨迹上显示的轨迹点
        this.mouseMoveClick_marker = null; //鼠标放在轨迹上显示的轨迹点点击
        this.points = []; // 全部点
        this.stopPoints = []; //停留点（超过3分钟以上）
        this.runPoints = []; //非停留点（小于或等于3分钟）
        this.trackMarks = []; //存储标记点对象,对应下方监控车辆列表,用来绑定联动点击事件
        this.trackInfoWindows = []; // 存储车辆监控infoWindows
        this.selectedMonitorCar = null; //监控列表，选择车的el
    };

    map.prototype = {
        reset: function() {
            this._map = null;
            this.centerPoint = null;
            this.isLoaded = null;
            this.overView = null;
            this.mouseMove_marker = null;
            this.mouseMoveClick_marker = null;
            this.stopPoints = [];
            this.runPoints = [];
            this.trackMarks = [];
            this.trackInfoWindows = [];
            this.points = [];
            this.selectedMonitorCar = null;
        },
        clearData: function() {
            if (this.trackMarks.length > 0) {
                for (var j = 0; j < this.trackMarks.length; j++) {
                    this.trackMarks[j].setMap(null);
                }
            }
            this.mouseMove_marker = null;
            this.mouseMoveClick_marker = null;
            this.stopPoints = [];
            this.runPoints = [];
            this.trackMarks = [];
            this.trackInfoWindows = [];
            this.points = [];
            this.selectedMonitorCar = null;
        },
        init: function(el, defaultPoint, defaultOverView, callback) {
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
        // 添加鼠标绘制类
        addDrawing: function(callback) {
            var me = this;
            var styleOptions = {
                strokeColor: "blue", //边线颜色。
                fillColor: "", //填充颜色。当参数为空时，圆形将没有填充效果。
                strokeWeight: 3, //边线的宽度，以像素为单位。
                strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
                fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。
                strokeStyle: 'solid' //边线的样式，solid或dashed。
            };
            var drawingManager = new BMapLib.DrawingManager(this._map, {
                isOpen: false, //是否开启绘制模式
                enableDrawingTool: true, //是否显示工具栏
                drawingToolOptions: {
                    anchor: BMAP_ANCHOR_TOP_LEFT, //位置
                    offset: new BMap.Size(120, 22), //偏离值
                    drawingModes: [BMAP_DRAWING_RECTANGLE]
                },
                rectangleOptions: styleOptions //矩形的样式
            });
            drawingManager.addEventListener('overlaycomplete', function(e) {
                var maxLng = 0,
                    maxLat = 0,
                    minLng = 0,
                    minLat = 0;
                var overlay = e.overlay;
                me._map.removeOverlay(e.overlay);
                drawingManager.close();
                var points = overlay.getPath();
                if (points.length > 0) {
                    var lngs = _.map(points, 'lng');
                    var lats = _.map(points, 'lat');
                    maxLng = _.max(lngs);
                    maxLat = _.max(lats);
                    minLng = _.min(lngs);
                    minLat = _.min(lats);
                }
                if (typeof(callback) == "function") {
                    callback({ MinLng: minLng, MinLat: minLat, MaxLng: maxLng, MaxLat: maxLat });
                }
            });

        },
        // 清除所有覆盖物
        clearOverlays: function() {
            this._map.clearOverlays();
        },
        // 删除鹰眼
        removeOverView: function() {
            this._map.removeControl(this.overView);
        },
        // 移动鹰眼
        moveOverView: function(order) {
            if (order == 'up') {
                //鹰眼升起
                this._map.removeControl(this.overView);
                this.overView = new BMap.OverviewMapControl({
                    isOpen: true,
                    anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
                    offset: new BMap.Size(0, 335)
                });
                this._map.addControl(this.overView); //鹰眼打开及偏移
            } else if (order == 'down') {
                //鹰眼下移
                this._map.removeControl(this.overView);
                this.overView = new BMap.OverviewMapControl({
                    isOpen: true,
                    anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
                    offset: new BMap.Size(0, 37)
                });
                this._map.addControl(this.overView); //鹰眼打开及偏移
            }
        },
        // 车辆监控-弹出框
        GetInfoWindow: function(data) {
            var status = '';
            if (data.IsOnline === 0) {
                status = '离线';
            } else if (data.Status.indexOf('ACC开') > -1 || data.IsOnline == 1) {
                status = '发动机开';
            } else if (data.Status.indexOf('ACC关') - 1) {
                status = 'ACC关';
            } else {
                status = '未知状态';
            }
            return "<div class='point_info_title'>" +
                "<div class='point_title_left'>车牌号：" + data.PlateNo + "</div>" +
                "<div style='display:inline-block'>" + data.GpsTime + "</div>" +
                "</div>" +
                "<div class='point_info_row'>" +
                "<div class='point_info_left'>车辆状态：" + status + "</div>" +
                "<div class='point_info_right'>速度：" + data.Speed + "公里/小时</div>" +
                "</div>" +
                "<div class='point_info_row'>" +
                "<div class='point_info_left'>停车时长：" + 0 + "</div>" +
                "<div class='point_info_right'>方向：" + data.DirectionDesc + "</div>" +
                "</div>" +
                (data.AlarmInfo ? "<div class='point_info_row'>" +
                    "<div class='point_info_right'>车辆警情：" + data.AlarmInfo + "</div></div>" : "") +
                "</div>" +
                "<div class='point_info_addr ellipsis' title='" + data.Location + "'>位置：" + data.Location + "</div>" +
                "<div class='point_btn'>" +
                "<div class='point_btn_info br' onclick='showVehicleInfo(" + data.Vid + ")'>车辆详细资料</div>" +
                "<div class='point_btn_info js-car-track' onclick=\"showVehicleTrack('" + data.Vid + "','" + data.PlateNo + "')\">轨迹回放</div>" +
                "</div>";
        },
        getMap: function() {
            return this._map;
        },
        // 车辆监控-添加覆盖物
        addTrackMark: function(data) {
            var me = this;
            // var label = new google.maps.MarkerLabel();
            // label.text = data.PlateNo;
            // label.color = "black";
            // label.fontFamily = "微软雅黑";
            // label.fontSize = "12px";
            // label.fontWeight = "normal";
            // label.setStyle({
            //     border: "1px solid black",
            //     color: "black",
            //     fontSize: "12px",
            //     height: "20px",
            //     lineHeight: "20px",
            //     fontFamily: "微软雅黑",
            //     borderRadius: "4px"
            // });
            // label.setContent();
            var iconUrl = '';
            var isOnline = data.IsOnline;
            var baseUrl = window.DOMAIN + '/img/map/';
            switch (data.Degrees) {
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
            var currentPoint = new google.maps.LatLng(data.Lat, data.Lng);
            var icon = { url: baseUrl + iconUrl, size: new google.maps.Size(30, 30) };
            var marker = new google.maps.Marker({
                position: currentPoint,
                map: me._map,
                icon: icon
            });
            marker.setTitle(data.PlateNo);
            // marker.setLabel(data.PlateNo);
            // 创建信息窗口对象
            var infoWindow = new google.maps.InfoWindow({
                content: me.GetInfoWindow(data)
            });
            google.maps.event.addListener(marker, 'click', function() {
                for (var i = 0; i < me.trackInfoWindows.length; i++) {
                    me.trackInfoWindows[i].close();
                }
                me._map.panTo(currentPoint);
                //将车辆列表中的记录设为选中状态
                me.selectedMonitorCar = "tr_monitor_" + data.PlateNo;
                var el = $('tr[data-flag="' + me.selectedMonitorCar + '"]');
                $("#carMonitorList tbody tr").removeClass("monitor-active");
                el.addClass("monitor-active");
                //滚动到列所在位置
                $("#carMonitorList").scrollTop(
                    $(el).offset().top - $("#carMonitorList").offset().top + $("#carMonitorList").scrollTop()
                );
                //点击地图弹窗的关闭按钮时，移除被监控车辆
                google.maps.event.addListener(infoWindow, "closeclick", function(e) {
                    me.selectedMonitorCar = null;
                    $("#carMonitorList tbody tr").removeClass("monitor-active");
                });
                infoWindow.open(me._map, marker);
            });
            this.trackMarks.push(marker);
            this.trackInfoWindows.push(infoWindow);
        },
        bindMonitorListEvent: function(data) {
            var me = this;
            $('#carMonitorList tbody tr').on('click', function() {
                var index = $(this).index();
                var scrollTop = $("#carMonitorList").scrollTop();
                me._map.setCenter(me.trackMarks[index].getPosition());
                google.maps.event.trigger(me.trackMarks[index], 'click');
                if (scrollTop) {
                    $("#carMonitorList").scrollTop(scrollTop);
                }
            });
        },
        // 设置中心点和zoom
        setCenterAndZoom: function(mapPoints) {
            var view = this._map.getViewport(eval(mapPoints));
            var mapZoom = view.zoom;
            var centerPoint = view.center;
            this._map.centerAndZoom(centerPoint, mapZoom);
        },
        // 统计点(未转化为地图点)
        summerPoint: function(data) {
            var me = this;
            $.each(data, function(index, item) {
                // 停留点（3分钟以上）
                // if (item.stopTime > 180) {
                //     me.stopPoints.push(item);
                // } else {
                //     me.runPoints.push(item);
                // }
                me.points.push(item);
            });
        },
        // 添加报警
        addAlarm: function(alarmData) {
            for (var i = 0, l = alarmData.length; i < l; i++) {
                var alarm = alarmData[i];
                var marker = new BMap.Marker(new BMap.Point(alarm.longitude, alarm.latitude), {
                    icon: new BMap.Icon(window.DOMAIN + '/img/icon_stop.png', new BMap.Size(16, 16))
                });
                var label_position = {
                    offset: new BMap.Size(12, -30)
                }
                var label = new BMap.Label(
                    "<div class='mapCarItem'>" + alarm.alarmTypeName + "&nbsp;&nbsp;" + alarm.speed + "Km/h</div>" +
                    "<div class='mapCarItem'>" + alarm.beginTimeStr + "&nbsp;&nbsp;&nbsp;持续:" + alarm.keepTimeStr + "</div>", label_position
                );
                label.setStyle({
                    color: "#333",
                    fontSize: "12px",
                    padding: '5px',
                    fontFamily: "微软雅黑",
                });
                this._map.addOverlay(marker);
                marker.setLabel(label);
            }
        },
        // 生成地图points
        generateMapPoints: function(data) {
            var mapPoints = [];
            $.each(data, function(index, item) {
                var point = new BMap.Point(item.Lng, item.Lat);
                mapPoints.push(point);
            });
            return mapPoints;
        },
        driving: function(data, callback) {
            var me = this;
            // 首个点时间
            $('.track-time').text(data[0].GpsTime);
            var driving = new BMap.DrivingRoute(this._map);
            driving.search(new BMap.Point(data[0].lng, data[0].lat), new BMap.Point(data[data.length - 1].lng, data[data.length - 1].lat));
            driving.setSearchCompleteCallback(function() {
                // 转化为地图点
                var mapPoints = me.generateMapPoints(data);
                // 统计数据
                me.summerPoint(data);
                // 添加曲线
                me.addTrackLine(mapPoints);
                // 设置中心点
                me.setCenterAndZoom(mapPoints);
                if (callback) callback();
            });
        },
        // 添加折线
        addTrackLine: function(mapPoints) {
            var me = this;
            // 移除所有标注
            this._map.clearOverlays();
            var trackLine = new BMap.Polyline(mapPoints, {
                strokeColor: "blue",
                strokeWeight: 4,
                strokeOpacity: 0.7
            });
            this._map.addOverlay(trackLine);
            //绘制开始点
            var startMark = new BMap.Marker(mapPoints[0], {
                icon: new BMap.Icon(window.DOMAIN + "/img/start.png", new BMap.Size(38, 45), {
                    imageOffset: new BMap.Size(0, 0)
                })
            });
            this._map.addOverlay(startMark);
            //绘制结束点
            var endMark = new BMap.Marker(mapPoints[mapPoints.length - 1], {
                icon: new BMap.Icon(window.DOMAIN + "/img/end.png", new BMap.Size(38, 45), {
                    imageOffset: new BMap.Size(0, 0)
                })
            });
            this._map.addOverlay(endMark);

            /*停留点*/
            // if (this.stopPoints.length > 0) {
            //     for (var i = 0; i < this.stopPoints.length; i++) {
            //         me.markStopPoint(me.stopPoints[i]);
            //     }
            // }

            // 折线事件绑定
            trackLine.addEventListener('mousemove', function(e) {
                var lng = e.point.lng;
                var lat = e.point.lat;
                var lngArr = _.map(me.points, function(point) {
                    return point.Lng;
                });
                var newLngArr = [];
                lngArr.map(function(longitude) {
                    newLngArr.push(Math.abs(longitude - lng));
                });
                var lngIndex = newLngArr.indexOf(Math.min.apply(null, newLngArr));
                me.addMarker(me.points[lngIndex]);
            });
            trackLine.addEventListener('mouseout', function(e) {
                me._map.removeOverlay(me.mouseMove_marker);
            });
        },
        // 鼠标悬浮，添加覆盖物
        addMarker: function(point) {
            var me = this;
            if (this.mouseMove_marker) {
                this._map.removeOverlay(this.mouseMove_marker);
            }
            var marker = new BMap.Marker(new BMap.Point(point.Lng, point.Lat), {
                icon: new BMap.Icon(window.DOMAIN + "/img/icon_pathway.png", new BMap.Size(16, 16))
            });
            //设置提示窗口Licenseplate
            var label_position = {
                position: new BMap.Point(point.Lng, point.Lat),
                offset: new BMap.Size(5, -55)
            }
            var label = new BMap.Label(
                "时间：" + point.GpsTime + "<br/>" + "速度：" + point.Speed + "km/h", label_position
            );
            label.setStyle({
                color: "#333",
                fontSize: "12px",
                padding: "5px 10px",
                lineHeight: "20px",
                fontFamily: "微软雅黑",
                border: "1px solid #ccc"
            });
            marker.setLabel(label);
            this.mouseMove_marker = marker;
            marker.addEventListener('click', function() {
                //打新的轨迹点并打开弹出框
                me.clickMarker(point);
            });
            this._map.addOverlay(marker);
        },
        // 鼠标移动,点击弹出详情
        clickMarker: function(point) {
            var me = this;
            if (me.mouseMoveClick_marker) {
                this._map.removeOverlay(me.mouseMoveClick_marker);
            }
            this._map.removeOverlay(this.mouseMove_marker);
            var clickedMarker = new BMap.Marker(new BMap.Point(point.Lng, point.Lat), {
                icon: new BMap.Icon(window.DOMAIN + "/img/icon_pathway.png", new BMap.Size(16, 16))
            });
            var sContent = "<div class='mapCarItem'>车牌：" + point.PlateNo + "</div>" + "<div class='mapCarItem'>时间：" + point.GpsTime + "</div>" + "<div class='mapCarItem'>速度：" + point.Speed + "km/h</div>" + "<div class='mapCarItem'><div class='pull-left'>位置：</div><div style='margin-left:36px;max-height: 37px;overflow: hidden;' title='" + point.Location + "'>" + point.Location + "</div></div>";
            var opts = {
                width: 300, // 信息窗口宽度
                height: 100, // 信息窗口高度
                title: "", // 信息窗口标题
                enableMessage: false //设置允许信息窗发送短息
            };
            var infoWindow = new BMap.InfoWindow(sContent, opts); // 创建信息窗口对象
            infoWindow.addEventListener("close", function() {
                me._map.removeOverlay(clickedMarker);
            });
            this._map.addOverlay(clickedMarker);
            clickedMarker.openInfoWindow(infoWindow);
        },
        // 添加停车点覆盖物
        markStopPoint: function(stopPoint) {
            var me = this;
            var markerStop = new BMap.Marker(new BMap.Point(stopPoint.Lng, stopPoint.Lat), {
                icon: new BMap.Icon(window.DOMAIN + "/img/icon_stop.png", new BMap.Size(16, 16), {
                    imageOffset: new BMap.Size(0, 0)
                })
            });
            var current_point = new BMap.Point(stopPoint.Lng, stopPoint.Lat);
            /*设置点击时候的提示窗口*/
            var stopPointInfo = '';
            stopPointInfo = "<div class='mapCarItem'>车牌号码：" + plateNumber + "</div>" +
                "<div class='mapCarItem'>开始时间：" + stopPoint.GpsTime + "</div>" +
                "<div class='mapCarItem'>结束时间：" + stopPoint.endGpsTime + "</div>" +
                "<div class='mapCarItem'>停留时长：" + stopPoint.duration + "</div>" +
                "<div class='mapCarItem'><div class='pull-left'>停留位置：</div><div style='margin-left:60px;' title='" + stopPoint.location + "'>" + stopPoint.location + "</div></div>";
            var opts = {
                width: 300, // 信息窗口宽度=
                height: 120, // 信息窗口高度
                title: "", // 信息窗口标题
                enableMessage: false //设置允许信息窗发送短息
            };
            var click_infoWindow = new BMap.InfoWindow(stopPointInfo, opts); // 创建信息窗口对象
            this._map.addOverlay(markerStop);
            markerStop.addEventListener("click", function() {
                this.openInfoWindow(click_infoWindow);
                me._map.panTo(current_point);
            });
        }
    };
    var _map = new map();

    module.exports = _map;

});