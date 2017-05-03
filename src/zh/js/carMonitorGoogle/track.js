define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    require('eventWrapper');
    var map = require('google');
    // 模板
    var tpls = {
        track: require('../../tpl/carMonitorGoogle/track'),
        trackList: require('../../tpl/carMonitorGoogle/trackList')
    };

    var carTrack = function() {
        this.id = null;
        this.plateNo = null;
        this.speedtime = null; // 播放速度
        this.runtimer = null; // 播放标识
        this.index = 0; // 当前点索引
        this.carMarker = null; //移动车
        this.infoWindow = null; //移动过程中弹出的窗口
        this.fTime = null;
        this.tTime = null;
        this.isHistoryLocation = null;
    };
    $.extend(carTrack.prototype, {
        init: function(param) {
            $('#admin').empty().html(template.compile(tpls.track)());
            this.id = param.id;
            this.plateNo = param.plateNo;
            map.init('trackMap');
            this.fTime = param.ftime || null;
            this.tTime = param.ttime || null;
            this.initControl();
        },
        // 初始化控件
        initControl: function(ftime, ttime) {
            var me = this;
            // 获取车辆
            var arrVids = common.getlocationStorage('arrVids');
            var arrVid = arrVids ? arrVids : this.id;
            common.loading('show');
            common.ajax(api.carPositionList, { ArrVid: arrVid }, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var data = res.content || [];
                    var selHtml = '';
                    $.each(data, function(index, item) {
                        selHtml += '<option value="' + item.Vid + '">' + item.PlateNo + '</option>';
                    });
                    $('select[name="selectCarList"]').append(selHtml);
                    common.initSelect('select[name="selectCarList"]', {}, function(param) {
                        $(':hidden[name="Vid"]').val(param.selected);
                    }, me.id);
                    $(':hidden[name="Vid"]').val(me.id);
                    $('.chosen-container').css('vertical-align', 'bottom');
                    me.getHistory();
                } else {
                    common.loading();
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.layMsg(msg);
                }
            });
            common.initDateTime('#startDate', null, true, 'yyyy-MM-dd 00:00');
            common.initDateTime('#endDate', null, true);
            // 设置时间
            if (this.fTime || this.tTime) {
                this.setTime();
            }
            this.event();
        },
        setTime: function() {
            var startDate = null;
            var endDate = null;
            if (this.fTime && this.tTime) {
                var ftime = new Date(Date.parse(this.fTime.replace(/-/g, "/")));
                var ttime = new Date(Date.parse(this.tTime.replace(/-/g, "/")));
                if (ftime >= ttime) {
                    startDate = ttime.format('yyyy-MM-dd h:m');
                    endDate = ftime.format('yyyy-MM-dd h:m');
                } else {
                    startDate = ftime.format('yyyy-MM-dd h:m');
                    endDate = ttime.format('yyyy-MM-dd h:m');
                }
            } else if (this.fTime) {
                startDate = this.fTime;
                endDate = new Date(this.fTime).format('yyyy-MM-dd') + ' 23:59:59';
            } else if (this.tTime) {
                startDate = this.tTime;
                endDate = (new Date(Date.parse(this.tTime.replace(/-/g, "/")))).format('yyyy-MM-dd') + ' 23:59:59';
            }
            if (startDate) $('#startDate').val(startDate);
            if (endDate) $('#endDate').val(endDate);
            if (startDate || endDate) {
                this.isHistoryLocation = true;
            }
        },
        // 查询历史轨迹
        getHistory: function() {
            var me = this;
            var vid = $(':hidden[name="Vid"]').val();
            if (!vid) {
                common.layMsg('该车没有绑定gps编号!');
                return false;
            }
            var startDate = $('#startDate').val();
            var endDate = $('#endDate').val();
            var chkResult = common.checkTime(endDate, startDate, 3);
            if (chkResult) {
                var sTime = this.isHistoryLocation ? startDate : startDate + ' :00';
                var eTime = this.isHistoryLocation ? endDate : endDate + ' :59';
                common.loading('show');
                common.ajax(api.carTrackHistory, { Vid: vid, STime: sTime, ETime: eTime }, function(res) {
                    if (res && res.status === 'SUCCESS') {
                        var data = res.content;
                        $('#track-history-list > table tbody').empty().html(template.compile(tpls.trackList)({ data: data }));
                        if (data && data.length > 0) {
                            for (var i = 0; i < data.length; i++) {
                                data[i] = common.directForm(data[i]);
                            }
                            map.drivingTrackLine(data, function() {
                                common.loading();
                            });

                        } else {
                            map.clearTrackMarks();
                        }
                    }
                    common.loading();
                });
            }
        },
        back: function() {
            map.reset();
            if (this.runtimer) {
                clearInterval(this.runtimer);
            }
            history.back();
        },
        reset: function() {
            map.clearTrackMarks();
            $('.trackPlay-btn').removeClass('pause');
            if (this.runtimer) {
                clearInterval(this.runtimer);
            }
            this.index = 0;
            this.speedtime = null;
            this.carMarker = null;
            this.infoWindow = null;
            // 重置速度条
            this.initSpeed();
            //重置进度条
            this.changeProgress(0);
        },
        initSpeed: function() {
            $('span.track-speed-width').css('width', '50%');
        },
        event: function() {
            var me = this;
            // 事件监听
            $('.track-container')
                // 轨迹列表显示或隐藏
                .on('click', '.js-toggle-list', function() {
                    $(this).toggleClass('active');
                    $('.track-list-data').toggle();
                })
                // 返回
                .on('click', '.js-track-back', function() {
                    me.back();
                })
                // 查询
                .on('click', '.js-search-history', function() {
                    me.reset();
                    me.getHistory();
                })
                // 切换车辆列表
                .on('click', '.js-foldToggle', function() {
                    var order = '';
                    if ($(this).hasClass('foldDown')) {
                        $(this).removeClass('foldDown').addClass('foldUp');
                        order = 'up';
                    } else {
                        $(this).removeClass('foldUp').addClass('foldDown');
                        order = 'down';
                    }
                    map.moveOverView(order);
                    $('.vehicle-box').hide();
                    $('.monitorBody').toggle();
                })
                .on('click', '.trackPlay-btn', function() {
                    if (me.hasData()) {
                        $(this).toggleClass('pause');
                        // 暂停
                        if ($(this).hasClass('pause')) {
                            /*横拉条的长度*/
                            var sideWidth = $(".track-speed-side").width();
                            /*横条距离右边的距离*/
                            var sideRightWidth = sideWidth - $(".track-speed-side .track-speed-width").width();
                            //计算
                            me.speedtime = sideRightWidth / sideWidth * 1000 + 500;
                            me.runtimer = setInterval(function() {
                                me.play();
                            }, me.speedtime);
                            $('.js-toggle-list').removeClass('active');
                            $('.track-list-data').hide();
                        } else {
                            if (me.runtimer) {
                                clearInterval(me.runtimer);
                            }
                        }
                    }
                })
                // 速度条事件处理
                .on('mouseup', '.track-speed-side', function(e) {
                    me.slideCalculateWidth(false, '.track-speed-side', '.track-speed-width', 16, e);
                    me.slideReCalculate();
                })
                .on('mousedown', '.track-speed-point', function(e) {
                    e.stopPropagation();
                    me.slideCalculateWidth(true, '.track-speed-side', '.track-speed-width', 16, null, '.track-speed-side');
                    $('.track-speed-side').mouseup(function(e) {
                        me.slideReCalculate();
                        $(this).unbind();
                    });
                })
                // 进度条事件处理
                .on('mouseup', '.track-range', function(e) {
                    me.slideCalculateWidth(false, '.track-range', '.track-process', 24, e);
                    me.rangeReCalculate();
                })
                .on('mousedown', '.track-range-point', function(e) {
                    e.stopPropagation();
                    me.slideCalculateWidth(true, '.track-range', '.track-process', 24, null, '.track-range');
                    $('.track-range').mouseup(function() {
                        me.rangeReCalculate();
                        $(this).unbind();
                    });
                });
        },
        hasData: function() {
            var _map = map._map;
            var points = map.points;
            return points.length > 0;
        },
        // 计算宽度
        slideCalculateWidth: function(isPoint, wrapel, el, icon, e, currentEl) {
            var me = this;
            /*横拉条的长度*/
            var _width = $(wrapel).width();
            /*混动条离左边的距离*/
            var _left = $(wrapel).offset().left;
            if (isPoint) {
                $(currentEl).on('mousemove', function(evt) {
                    var current_mouse = evt.pageX; //当前鼠标的位置
                    var mouse_distance = current_mouse - _left; //当前鼠标与横拉条距离左边的距离；
                    me.slideMove(_width, mouse_distance, el, icon);
                });
            } else {
                var current_mouse = e.pageX; //当前鼠标的位置
                var mouse_distance = current_mouse - _left; //当前鼠标与横拉条距离左边的距离；
                me.slideMove(_width, mouse_distance, el, icon);
            }
        },
        // 进度条计算
        rangeReCalculate: function() {
            var me = this;
            var _map = map._map;
            var points = map.points;
            if (this.hasData()) {
                var progress_wrapWidth = $(".track-range").width(); //播放进度条长度
                var progress_left = $(".track-range .track-process").width(); //计算进度条离坐标的距离
                if (progress_left == progress_wrapWidth - 5) {
                    progress_left = progress_left + 5;
                }
                if (progress_left == 19) {
                    progress_left = progress_left - 19;
                }
                //计算索引
                this.index = parseInt(progress_left / progress_wrapWidth * (points.length - 1));
                if (this.index <= points.length - 1) {
                    this.addMarkCar();
                    //设置时间
                    if (points[this.index].GpsTime) {
                        $(".track-time").text(points[this.index].GpsTime);
                    }
                    _map.panTo(points[this.index]);
                }
                //计算进度条
                var width = (progress_left - 2) / progress_wrapWidth * 100;
                this.changeProgress(width);
            }
        },
        // 速度条计算
        slideReCalculate: function() {
            var me = this;
            if (this.hasData()) {
                /*横拉条的长度*/
                var slide_width = $(".track-speed-side").width();
                /*混动条离左边的距离*/
                var parent_left = slide_width - $(".track-speed-side .track-speed-width").width();
                //计算
                var speedsum = parent_left / slide_width * 1000 + 500;
                //清除计时器
                //判断是否在播放状态
                if ($(".trackPlay-btn").hasClass('pause')) { //播放中
                    if (this.runtimer) {
                        clearInterval(this.runtimer);
                        //重设置计时器
                        this.runtimer = setInterval(function() {
                            me.play(this.index);
                        }, speedsum);
                    }
                } else { //暂停
                    this.speedtime = speedsum;
                }
            }
        },
        slideMove: function(slideWidth, mouseDistance, el, pointWidth) {
            var newWidth = 0;
            if (mouseDistance < pointWidth - 5 || mouseDistance == pointWidth - 5) {
                newWidth = pointWidth - 5;
            }
            if (mouseDistance > slideWidth - 5 || mouseDistance == slideWidth - 5) {
                newWidth = slideWidth - 5;
            }
            if (mouseDistance > pointWidth - 5 && mouseDistance < slideWidth - 5) {
                newWidth = mouseDistance + 5;
            }
            $(el).css({
                width: newWidth + "px"
            });
        },
        addMarkCar: function() {
            var me = this;
            var _map = map._map;
            var allPoints = map.points;
            var point = allPoints[this.index];
            var thisLatLng = new google.maps.LatLng(point.Lat, point.Lng);
            // 添加小车
            if (!this.carMarker) {
                var img = {
                    url: window.DOMAIN + "/img/map/green1.png",
                    size: new google.maps.Size(30, 30),
                    origin: new google.maps.Point(0, 0)
                };
                var stratLatLng = new google.maps.LatLng(allPoints[0].Lat, allPoints[0].Lng);
                this.carMarker = new google.maps.Marker({
                    position: stratLatLng,
                    map: _map,
                    icon: img
                });
                _map.setZoom(_map.zoom + 1);
                _map.panTo(stratLatLng);
            }
            me.setIcon(this.carMarker, point.Degrees);
            this.carMarker.setPosition(thisLatLng);
            me.setPointCenter(me.index, allPoints);
            var sContent = "<div class='mapCarItem'>车牌：" + point.PlateNo + "</div>" + "<div class='mapCarItem'>时间：" + point.GpsTime + "</div>" + "<div class='mapCarItem'>速度：" + point.Speed + "km/h</div>" + "<div class='mapCarItem'><div class='pull-left'>位置：</div><div style='margin-left:36px;max-height: 37px;overflow: hidden;' title='" + point.Location + "'>" + point.Location + "</div></div>";
            // 创建信息窗口对象
            if (me.infoWindow) {
                me.infoWindow.close();
                me.infoWindow = null;
            }
            me.infoWindow = new google.maps.InfoWindow({
                content: sContent
            });
            me.infoWindow.open(_map, this.carMarker);
        },
        changeProgress: function(width) {
            if (width < 1) {
                width = 1;
            }
            $(".track-process").css("width", width + "%");
        },
        play: function() {
            var _map = map._map;
            var allPoints = map.points;
            this.addMarkCar();
            //设置时间
            $(".track-time").empty();
            if (this.index > 0) {
                $(".track-time").text(allPoints[this.index].GpsTime);
            } else {
                $(".track-time").text(allPoints[0].GpsTime);
            }
            //计算进度条
            var width = (this.index + 1) / allPoints.length * 100;
            this.changeProgress(width);
            this.index++;
            //播放到最后一个点归零            
            if (this.index == allPoints.length) {
                var defaultLatLng = new google.maps.LatLng(allPoints[0].Lat, allPoints[0].Lng);
                this.index = 0;
                $('.trackPlay-btn').removeClass('pause');
                this.carMarker.setPosition(defaultLatLng);
                _map.panTo(defaultLatLng);
                $('.track-process').css('width', '1%');
                //设置时间
                $(".track-time").empty();
                $('.track-time').text(allPoints[0].GpsTime);
                if (this.runtimer) {
                    clearInterval(this.runtimer);
                    _map.panTo(defaultLatLng);
                }
                this.infoWindow.close();
                this.infoWindow = null;
            }
        },
        setIcon: function(carMarker, degrees) {
            var currentImg = map.getIconUrl(degrees, true);
            var markerImg = new google.maps.MarkerImage(currentImg);
            carMarker.setIcon(markerImg);
        },
        setPointCenter: function(index, allPoints) {
            var mapLatLngBounds = map._map.getBounds();
            var maxX = mapLatLngBounds.getNorthEast().lng();
            var maxY = mapLatLngBounds.getNorthEast().lat();
            var minX = mapLatLngBounds.getSouthWest().lng();
            var minY = mapLatLngBounds.getSouthWest().lat();

            if (index < allPoints.length - 1) {
                var nextLat = allPoints[index + 1].lat;
                var nextLng = allPoints[index + 1].lng;
                if (nextLat > maxY || nextLng > maxX || nextLat < minY || nextLng < minX) {
                    var nextLat1 = allPoints[index].lat;
                    var nextLng1 = allPoints[index].lng;
                    var _thisLanLng = new google.maps.LatLng(nextLat1, nextLng1);
                    map._map.panTo(_thisLanLng);
                }
            }
        }
    });

    exports.init = function(param) {
        new carTrack().init(param);
    };
});