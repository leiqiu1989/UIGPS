define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var validate = require('validate');
    var common = require('common');
    var api = require('api');
    var map = require('map');
    require('lodash');
    require('marktool');

    // 模板
    var tpls = {
        add: require('../../tpl/geofenceManager/add')
    };

    var addGeofence = function() {
        this.id = null;
        this.isEdit = null;
        this.markTool = null;
        this.mark = null;
        this.cricle = null;
    };
    $.extend(addGeofence.prototype, {
        init: function(id) {
            this.id = $.isEmptyObject(id) ? null : id;
            this.isEdit = !!this.id;
            this.initPage();
        },
        renderHtml: function(title, data) {
            var me = this;
            data = data || {};
            $('#main-content').empty().html(template.compile(tpls.add)({ title: title, data: data }));
            map.init('geofenceMap', null, false);
            this.initMapTime = setInterval(function() {
                if (map.isLoaded) {
                    clearInterval(me.initMapTime);
                    if (data && !$.isEmptyObject(data)) {
                        me.bindMapData(data.Lng, data.Lat);
                    }
                }
            }, 500);
        },
        initPage: function() {
            var me = this;
            var title = this.isEdit ? '编辑围栏' : '新增围栏';
            if (this.isEdit) {
                common.ajax(api.landMarkPointManager.detail, {
                    LandMarkId: this.id
                }, function(res) {
                    if (res.status === 'SUCCESS') {
                        var data = res.content;
                        me.renderHtml(title, data);
                    }
                });
            } else {
                this.renderHtml(title);
            }
            common.layUIForm();
            this.event();
        },
        bindMapData: function(lng, lat) {
            var me = this;
            var point = new BMap.Point(lng, lat);
            var geoc = new BMap.Geocoder();
            geoc.getLocation(point, function(rs) {
                var addComp = rs.addressComponents;
                var address = addComp.province + "" + addComp.city + "" + addComp.district + "" + addComp.street + "" + addComp.streetNumber;
                common.setElValue('input[name="searchTxt"]', address);
                // 编辑
                me.markTool = new BMapLib.MarkerTool(map._map, {
                    autoClose: true,
                    followText: '选择要标注的区域',
                });
                map._map.panTo(point);
                me.markTool.markPoint(point);
                $('.js_mark_point').addClass('disabled');
            });
        },
        addCricle: function(point) {
            var mapPoint = new BMap.Point(point.lng, point.lat);
            var circle = new BMap.Circle(mapPoint, 200, {
                strokeColor: '#B7AD76',
                fillColor: '#95E0DC',
                strokeWeight: 1,
                strokeOpacity: 1,
                strokeStyle: 'solid',
                fillOpacity: '0.6'
            });
            this.cricle = circle;
            map._map.addOverlay(circle);

        },
        submitForm: function() {
            var me = this;
            if (this.markTool) {
                var url = this.isEdit ? api.landMarkPointManager.update : api.landMarkPointManager.add;
                var params = {
                    LandMarkName: common.getElValue('input[name="LandMarkName"]'),
                    Remark: common.getElValue('textarea[name="Remark"]')
                };
                if (this.isEdit) {
                    params.LandMarkId = this.id;
                }
                common.loading('show');
                common.ajax(url, params, function(res) {
                    if (res && res.status === 'SUCCESS') {
                        common.layMsg('数据操作成功');
                        common.changeHash('#landmarkPointManager/index');
                    } else {
                        var msg = res.errorMsg ? res.errorMsg : '服务器问题，请稍后重试';
                        common.layMsg(msg);
                    }
                    common.loading();
                });
            } else {
                common.layAlert('请在地图上面标注地标点!');
                return false;
            }
        },
        locationSearch: function(searchTxt) {
            var me = this;
            // 清除地图所以图层
            map.clearOverlays();
            var options = {
                onSearchComplete: function(result) {
                    //查询结果状态码
                    if (localSearch.getStatus() == BMAP_STATUS_SUCCESS) {
                        var ur = result.ur;
                        var points = [];
                        var mapPoints = [];
                        if (ur.length > 0) {
                            $.each(ur, function(i, item) {
                                points.push(item.point);
                            });
                        }
                        if (points.length > 0) {
                            $.each(points, function(i, item) {
                                var point = new BMap.Point(item.lng, item.lat);
                                mapPoints.push(point);
                            });
                        }
                        $('.js_mark_point').addClass('disabled');
                        me.convertMapSearch(mapPoints); //对结果进行处理
                    } else {
                        $('.js_mark_point').removeClass('disabled');
                    }
                }
            };
            var localSearch = new BMap.LocalSearch(map._map, options);
            localSearch.search(searchTxt);
        },
        convertMapSearch: function(mapPoints) {
            map.setCenterAndZoom(mapPoints);
            if (!this.markTool) {
                this.markTool = new BMapLib.MarkerTool(map._map, {
                    autoClose: true,
                    followText: '选择要标注的区域',
                });
            }
            map._map.panTo(mapPoints[0]);
            this.markTool.markPoint(mapPoints[0]);
            this.markToolEvent();
            this.addCricle(mapPoints[0]);
        },
        markToolEvent: function() {
            var me = this;
            me.markTool.addEventListener("markend", function(evt) {
                me.mark = evt.marker;
                me.mark.addEventListener('dragstart', function() {
                    map._map.removeOverlay(me.cricle);
                });
                me.mark.addEventListener('dragend', function(evt) {
                    var evtPix = evt.pixel;
                    var iconPix = new BMap.Pixel(evtPix.x, evtPix.y);
                    var pt = map._map.pixelToPoint(iconPix);
                    me.addCricle(pt);
                });
                me.addCricle(evt.marker.point);
            });
        },
        event: function() {
            var me = this;
            $('#main-content').on('click', '.js-cancel', function() {
                common.changeHash('#geofenceManager/index');
            }).on('click', '.js-save', function() {
                var lanMarkName = $.trim($('input[name="LandMarkName"]').val());
                var remark = $.trim($('input[name="LandMarkName"]').val());
                if (!lanMarkName || lanMarkName.length > 20) {
                    common.layAlert('地标点名称不能为空，且最大长度20个字符!', { icon: 2 });
                    return false;
                }
                if (remark && remark.length > 50) {
                    common.layAlert('最大长度50个字符!', { icon: 2 });
                    return false;
                }
                me.submitForm();
            }).on('click', '.js_search_map', function() {
                var searchTxt = $('input[name="searchTxt"]').val();
                if (!$.trim(searchTxt)) {
                    common.layAlert('请输入查询条件！', { icon: 2 });
                    return false;
                }
                if (me.markTool) {
                    me.markTool.setPoint(null);
                }
                me.locationSearch(searchTxt);
            }).on('click', '.js_mark_point', function() {
                if (!$(this).hasClass('disabled')) {
                    $(this).addClass('disabled');
                    me.markTool = new BMapLib.MarkerTool(map._map, {
                        autoClose: true,
                        followText: '选择要标注的区域'
                    });
                    me.markToolEvent();
                    me.markTool.open();
                } else {
                    return false;
                }
            }).on('click', '.js_mark_point_clear', function() {
                map.clearOverlays();
                $('.js_mark_point').removeClass('disabled');
                $('input[name="searchTxt"]').val('');
                me.markTool = null;
                me.mark = null;
            });
        }
    });

    exports.init = function(id) {
        new addGeofence().init(id);
    };
});