define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var validate = require('validate');
    var common = require('common');
    var api = require('api');
    var map = require('google');
    require('lodash');

    // 模板
    var tpls = {
        add: require('../../tpl/geofenceManager/add')
    };

    var addGeofence = function() {
        this.id = null;
        this.isEdit = null;
        this.mark = null;
        this.cricle = null;
        this.lat = null;
        this.lng = null;
    };
    $.extend(addGeofence.prototype, {
        init: function(id) {
            this.id = $.isEmptyObject(id) ? null : id;
            this.isEdit = !!this.id;
            this.initPage();
        },
        initPage: function() {
            var me = this;
            var title = this.isEdit ? 'Edit Geofence' : 'Add Geofence';
            if (this.isEdit) {
                common.ajax(api.areaManager.detail, {
                    KeyId: this.id
                }, function(res) {
                    if (res.status === 'SUCCESS') {
                        var data = res.content;
                        me.renderHtml(title, data);
                        me.initControl(data);
                    }
                });
            } else {
                this.renderHtml(title);
                this.initControl();
            }
            this.event();
        },
        initControl: function(data) {
            common.subordinateTree({
                loadSIM: false, //不加载sim
                loadDevice: false, //不加载设备编号
                orgNo: data ? data.OrgNo : '', // 机构编号
                PlateNo: data ? data.PlateNo : '' //车牌号码
            });
            common.layUIForm({
                callback: function() {
                    if (data) {
                        // radius
                        $('#Radius').val(data.Radius);
                        var txtRadius = $('#Radius > option:selected').text();
                        $('#Radius').next().find(':text').val(txtRadius).end()
                            .find('dd[lay-value=' + data.Radius + ']').addClass('layui-this').siblings().removeClass('layui-this');
                        // status
                        $('#status').val(data.Enabled);
                        var txtEnabled = $('#status > option:selected').text();
                        $('#status').next().find(':text').val(txtEnabled).end()
                            .find('dd[lay-value=' + data.Enabled + ']').addClass('layui-this').siblings().removeClass('layui-this');
                        // arae in,area out
                        if (data.AreaIn) {
                            $('[name="AreaIn"]').attr('checked', true).next('div').addClass('layui-form-checked');
                        }
                        if (data.AreaOut) {
                            $('[name="AreaOut"]').attr('checked', true).next('div').addClass('layui-form-checked');
                        }
                    }
                }
            });
        },
        renderHtml: function(title, data) {
            var me = this;
            data = data || {};
            $('#main-content').empty().html(template.compile(tpls.add)({ title: title, data: data }));
            this.validateForm();
            map.init('geofenceMap');
            if (data && !$.isEmptyObject(data)) {
                me.bindMapData(data.Lng, data.Lat);
            }
            this.placeAutoComplete();
        },
        placeAutoComplete: function() {
            var me = this;
            var _map = map._map;
            var input = document.getElementById('searchTxt');
            var autocomplete = new google.maps.places.Autocomplete(input);
            var marker = new google.maps.Marker({
                map: _map,
                anchorPoint: new google.maps.Point(0, -29)
            });
            autocomplete.bindTo('bounds', _map);
            autocomplete.addListener('place_changed', function() {
                marker.setVisible(false);
                if (me.cricle) {
                    me.cricle.setMap(null);
                }
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    common.layAlert("No details available for input: '" + place.name + "'");
                    return;
                }
                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    _map.fitBounds(place.geometry.viewport);
                } else {
                    _map.setCenter(place.geometry.location);
                    _map.setZoom(17); // Why 17? Because it looks good.
                }
                marker.setIcon(({
                    url: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(35, 35)
                }));
                marker.setDraggable(true);
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);
                var location = place.geometry.location;
                var lng = location.lng();
                var lat = location.lat();
                me.addCricle(lat, lng);
                me.mark = marker;
                me.markEvent();
            });
        },
        markEvent: function() {
            var me = this;
            google.maps.event.addListener(this.mark, 'dragstart', function() {
                if (me.cricle) {
                    me.cricle.setMap(null);
                }
            });
            google.maps.event.addListener(this.mark, 'dragend', function(evt) {
                var latlng = evt.latLng;
                var lat = latlng.lat();
                var lng = latlng.lng();
                me.addCricle(lat, lng);
            });
        },
        bindMapData: function(lng, lat) {
            var me = this;
            var point = new google.maps.LatLng(lat, lng);
            this.reverseGeocode(lat, lng, function(place) {
                common.setElValue('input[name="searchTxt"]', place);
                var marker = new google.maps.Marker({
                    position: point,
                    map: map._map,
                    icon: {
                        url: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(35, 35)
                    }
                });
                marker.setDraggable(true);
                me.addCricle(lat, lng);
                map._map.setZoom(17);
                map._map.panTo(point);
                me.mark = marker;
                me.markEvent();
            });
        },
        reverseGeocode: function(lat, lng, fn) {
            var _place = '';
            var geocoder = new google.maps.Geocoder;
            var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
            geocoder.geocode({ 'location': latlng }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        _place = results[0].formatted_address;
                    }
                    if (results[1]) {
                        _place = results[1].formatted_address;
                    }
                }
                if (typeof fn == 'function') {
                    fn.call(this, _place);
                }
            });
        },
        addCricle: function(lat, lng) {
            if (this.cricle) {
                this.cricle.setMap(null);
            }
            this.lat = lat;
            this.lng = lng;
            var radius = parseInt($('#Radius').val());
            var point = new google.maps.LatLng(lat, lng);
            var cricle = new google.maps.Circle({
                strokeColor: '#B7AD76',
                fillColor: '#95E0DC',
                strokeWeight: 1,
                strokeOpacity: 1,
                fillOpacity: '0.6',
                map: map._map,
                center: point,
                radius: radius
            });
            this.cricle = cricle;
        },
        validateForm: function() {
            var me = this;
            validate('#frmGeofenceAdd', {
                subBtn: '.js_geofence_save',
                promptPos: 'inline',
                submit: function() {
                    me.submitForm();
                }
            });
        },
        submitForm: function() {
            var me = this;
            if (this.mark) {
                var url = this.isEdit ? api.areaManager.update : api.areaManager.add;
                var params = common.getFormData('#frmGeofenceAdd');
                params = $.extend(params, {
                    Vid: $('#selPlateNumber > option:selected').attr('vid'),
                    AreaIn: $('[name="AreaIn"]').is(':checked') ? 1 : 0,
                    AreaOut: $('[name="AreaOut"]').is(':checked') ? 1 : 0,
                    Lat: this.lat,
                    Lng: this.lng,
                    Enabled: parseInt($('#status').val())
                });
                if (this.isEdit) {
                    params.KeyId = this.id;
                }
                common.loading('show');
                common.ajax(url, params, function(res) {
                    if (res && res.status === 'SUCCESS') {
                        common.layMsg('Operator Success!');
                        common.changeHash('#geofenceManager/index/', { back: true });
                    } else {
                        var msg = res.errorMsg ? res.errorMsg : 'Server problem, please try again later';
                        common.layMsg(msg);
                    }
                    common.loading();
                });
            } else {
                common.layAlert('Please mark the mark on the map!');
                return false;
            }
        },
        event: function() {
            var me = this;
            $('#main-content')
                .on('click', '.js_geofence_cancel', function() {
                    common.changeHash('#geofenceManager/index/', { back: true });
                })
                // 清除标注物
                .on('click', '.js_mark_point_clear', function() {
                    common.setElValue('input[name="searchTxt"]', '');
                    if (me.cricle) { me.cricle.setMap(null); }
                    if (me.mark) {
                        me.mark.setVisible(false);
                    }
                });
        }
    });

    exports.init = function(param) {
        new addGeofence().init(param.id);
    };
});