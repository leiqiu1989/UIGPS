define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    var validate = require('validate');
    var map = require('google');
    require('marktool');

    // 模板
    var tpls = {
        edit: require('../../tpl/landmarkPointManager/edit')
    };

    var landMarkPointEdit = function() {
        this.id = null;
        this.isEdit = null;
        this.mark = null;
    };

    $.extend(landMarkPointEdit.prototype, {
        init: function(id) {
            this.id = id || null;
            this.isEdit = !!id;
            this.initPage();
        },
        renderHtml: function(title, data) {
            var me = this;
            data = data || {};
            $('#main-content').empty().html(template.compile(tpls.edit)({ title: title, data: data }));
            map.init('landMarkPointMap');
            if (data && !$.isEmptyObject(data)) {
                me.bindMapData(data.Lat, data.Lng);
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
                marker.setIcon( /** @type {google.maps.Icon} */ ({
                    url: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png', //place.icon
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(35, 35)
                }));
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);
                me.getMapValue(place.geometry.location);
                me.mark = marker;
            });
        },
        initPage: function() {
            var me = this;
            var title = this.isEdit ? 'Edit' : 'Add';
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
            this.event();
        },
        bindMapData: function(lat, lng) {
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
        submitForm: function() {
            var me = this;
            if (this.mark) {
                var url = this.isEdit ? api.landMarkPointManager.update : api.landMarkPointManager.add;
                var params = {
                    LandMarkName: common.getElValue('input[name="LandMarkName"]'),
                    Lng: $('.js-lng').val(),
                    Lat: $('.js-lat').val(),
                    Remark: common.getElValue('textarea[name="Remark"]')
                };
                if (this.isEdit) {
                    params.LandMarkId = this.id;
                }
                common.loading('show');
                common.ajax(url, params, function(res) {
                    if (res && res.status === 'SUCCESS') {
                        common.layMsg('SUCCESS');
                        common.changeHash('#landmarkPointManager/index');
                    } else {
                        var msg = res.errorMsg ? res.errorMsg : 'Server problem, please try again later';
                        common.layMsg(msg);
                    }
                    common.loading();
                });
            } else {
                common.layAlert('Please mark the markup above the map!');
                return false;
            }
        },
        getMapValue: function(point) {
            $('.js-lng').val(point.lng().toFixed(6));
            $('.js-lat').val(point.lat().toFixed(6));
        },
        event: function() {
            var me = this;
            $('#main-content').on('click', '.js-cancel', function() {
                common.changeHash('#landmarkPointManager/index');
            }).on('click', '.js-save', function() {
                var lanMarkName = $.trim($('input[name="LandMarkName"]').val());
                var remark = $.trim($('input[name="LandMarkName"]').val());
                if (!lanMarkName || lanMarkName.length > 20) {
                    common.layAlert('Name It can not be empty, and the maximum length of 20 characters!', { icon: 2 });
                    return false;
                }
                if (remark && remark.length > 50) {
                    common.layAlert('The maximum length of 50 characters!', { icon: 2 });
                    return false;
                }
                me.submitForm();
            });
        }
    });

    exports.init = function(param) {
        new landMarkPointEdit().init(param.id);
    };
});