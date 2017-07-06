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
                common.ajax(api.landMarkPointManager.detail, {
                    LandMarkId: this.id
                }, function(res) {
                    if (res.status === 'SUCCESS') {
                        var data = res.content;
                        //me.initControl(data);
                        me.renderHtml(title, data);
                    }
                });
            } else {
                this.renderHtml(title);
                //this.initControl();
            }
            this.event();

        },
        initControl: function(data) {
            common.subordinateTree({
                loadSIM: false, //不加载sim
                loadDevice: false, //不加载设备编号
                orgNo: '', // 机构编号
                PlateNo: '' //车牌号码
            });
            common.layUIForm();
        },
        renderHtml: function(title, data) {
            var me = this;
            data = data || {};
            $('#main-content').empty().html(template.compile(tpls.add)({ title: title, data: data }));
            this.validate();
            //map.init('geofenceMap');
            // if (data && !$.isEmptyObject(data)) {
            //     me.bindMapData(data.Lng, data.Lat);
            // }
            // this.placeAutoComplete();
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
                me.addCricle(place.geometry.location);
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
                me.addCricle(latlng);
            });
        },
        bindMapData: function(lng, lat) {
            var me = this;
            lng = 104.123597;
            lat = 30.600088;
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
                me.mark = marker;
                map._map.setZoom(17);
                map._map.panTo(point);
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
        addCricle: function(mapLocation) {
            if (this.cricle) {
                this.cricle.setMap(null);
            }
            var lng = mapLocation.lng();
            var lat = mapLocation.lat();
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
        validate: function() {
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
            debugger;
            var me = this;
            if (this.mark) {
                var url = this.isEdit ? api.areaManager.update : api.areaManager.add;
                var params = common.getFormData('#frmGeofence');
                debugger;
                // common.loading('show');
                // common.ajax(url, params, function(res) {
                //     if (res && res.status === 'SUCCESS') {
                //         common.layMsg('Operator Success!');
                //         common.changeHash('#geofenceManager/index/', { back: true });
                //     } else {
                //         var msg = res.errorMsg ? res.errorMsg : 'Server problem, please try again later';
                //         common.layMsg(msg);
                //     }
                //     common.loading();
                // });
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

    exports.init = function(id) {
        new addGeofence().init(id);
    };
});