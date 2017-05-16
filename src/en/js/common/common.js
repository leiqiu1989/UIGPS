define(function(require, exports, module) {
    'use strict';

    //datapicker
    var datapicker = require('datepicker');
    var tpls = {
        odbInfo: require('../../tpl/carMonitor/odb')
    };
    //dialog
    var api = require('api');
    var page = require('page');
    require('lodash');
    require('chosen');
    var layer = null;
    layui.use('layer', function() {
        layer = layui.layer;
    });
    // 模块全局变量
    var nodeList;
    var outNodeList;
    // 系统全局变量
    var roleCodeList = null; //角色代码列表
    // 权限数组
    var rolesMenu = [{
            name: 'Vehicle Monitor',
            code: '00016',
            url: '#carMonitor/index',
            groupname: 'Location Monitor',
            group: 'carmonitor',
            icon: 'icon-position'
        }, {
            name: 'Query History Location',
            code: '00011',
            url: '#historyLocation/index',
            groupname: 'Location Monitor',
            group: 'carmonitor',
            icon: ''
        }, {
            name: 'Punctuation Management',
            code: '00030',
            url: '#landmarkPointManager/index',
            groupname: 'Location Monitor',
            group: 'carmonitor',
            icon: ''
        }, {
            name: 'User Management',
            code: '00007',
            url: '#userManager/index',
            groupname: 'Organization',
            group: 'users',
            icon: 'icon-org'
        }, {
            name: 'Role Management',
            code: '00006',
            url: '#roleManager/index',
            groupname: 'Organization',
            group: 'users',
            icon: ''
        },
        {
            name: 'Vehicle Management',
            code: '00005',
            url: '#carManager/index',
            groupname: 'Vechile Info.',
            group: 'resource',
            icon: 'icon-car'
        }, {
            name: 'Commands Sent',
            code: '00029',
            url: '#sendCode/index',
            groupname: 'Vechile Info.',
            group: 'resource',
            icon: ''
        }, {
            name: '车辆轨迹列表',
            code: '00024',
            url: 'javascript:void(0)',
            groupname: 'Report management',
            group: 'report',
            icon: 'fa fa-pie-chart'
        }, {
            name: 'Vehicle alarm report',
            code: '00025',
            url: 'javascript:void(0)',
            groupname: 'Report management',
            group: 'report',
            icon: ''
        }, {
            name: 'Vehicle mileage statistics',
            code: '00026',
            url: 'javascript:void(0)',
            groupname: 'Report management',
            group: 'report',
            icon: ''
        }, {
            name: 'Device command record',
            code: '00027',
            url: 'javascript:void(0)',
            groupname: 'Report management',
            group: 'report',
            icon: ''
        }
    ];

    /*js对象扩展*/
    Date.prototype.format = function(format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };

    /**********template helper 公共方法***********/
    // 地图方向转换
    template.helper('directForm', function(direction) {
        var flags;
        if (direction < 23 || direction > 338) {
            flags = "North";
        } else if (direction < 68) {
            flags = "Northeast";
        } else if (direction < 113) {
            flags = "East";
        } else if (direction < 157) {
            flags = "Southeast";
        } else if (direction < 203) {
            flags = "South";
        } else if (direction < 248) {
            flags = "Southwest";
        } else if (direction < 293) {
            flags = "West";
        } else {
            flags = "Northwest";
        }
        return flags;
    });
    template.helper('userStatus', function(key) {
        return key == 0 ? 'Disabled' : key == 1 ? 'Enabled' : '';
    });
    template.helper('carStatus', function(key) {
        return !key ? '' : key == 1 ? 'Online' : 'Offline';
    });
    template.helper('sliceDate', function(date) {
        return date ? date.slice(0, 10) : '';
    });
    template.helper('GPSID', function(key) {
        return !key ? '' : key.substr(key.length - 7);
    });
    template.helper('plateNumberColorDesc', function(key) {
        return key == 1 ? 'Blue' : 'Yellow';
    });
    template.helper('formateDate', function(key, format) {
        format = format || 'yyyy/MM/dd';
        return !key ? '' : new Date(key).format(format);
    });
    template.helper('dateTimeCls', function(key) {
        var currentTime = Date.parse(new Date());
        if (!key) {
            return '';
        } else {
            var keyTime = 0;
            if (_.isString(key)) {
                keyTime = Date.parse(key.replace(/-/g, "/"));
            } else {
                keyTime = Date.parse(key);
            }
            return keyTime < currentTime ? 'red' : '';
        }
    });
    template.helper('odbNull', function(key) {
        return key ? key : '0';
    });

    /*公共js*/
    var common = {
        getPermission: function(code) {
            var rt = _.find(roleCodeList, function(item, index) {
                return item === code;
            });
            return !!rt;
        },
        // 获取obd信息
        getOBDInfo: function(vid) {
            var me = this;
            this.ajax(api.odbInfo, { vid: vid }, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var data = res.content || {};
                    $('.obd-Content').empty().html(template.compile(tpls.odbInfo)({
                        data: data
                    }));
                    $('#obdList').removeClass('hidden');
                } else {
                    var msg = res.errorMsg || 'System error, please contact the administrator!';
                    me.layMsg(msg);
                }
            });
        },
        // 日期区间选择
        initDateRangeChange: function(type) {
            //按周日为一周的最后一天计算
            var date = new Date();
            var startTime = null;
            var endTime = date.format('yyyy-MM-dd');
            switch (type) {
                case 'week':
                    var this_day = date.getDay(); //今天是这周的第几天
                    var step_s = -this_day + 1; //上周日距离今天的天数（负数表示）
                    if (this_day === 0) {
                        step_s = -7; // 如果今天是周日
                    }
                    // var step_m = 7 - this_day; // 周日距离今天的天数（负数表示）
                    var thisTime = date.getTime();
                    startTime = new Date(thisTime + step_s * 24 * 3600 * 1000).format('yyyy-MM-dd');
                    break;
                case 'month':
                    startTime = new Date(date.getFullYear(), date.getMonth(), 1).format('yyyy-MM-dd');
                    break;
                case 'custom':
                    startTime = date.format('yyyy-MM-dd');
                    break;
            }
            if (type != 'custom') {
                $('input[name="startTime"],input[name="endTime"]').datetimepicker('destroy');
            } else {
                this.initDateTime('input[name="startTime"]', 'Y-m-d', true, 'yyyy-MM-dd', false);
                this.initDateTime('input[name="endTime"]', 'Y-m-d', true, 'yyyy-MM-dd', false);
            }
            $('input[name="startTime"]').val(startTime);
            $('input[name="endTime"]').val(endTime);
        },
        // 初始化日期
        initDateTime: function(el, formatStyle, hasDefValue, defValueformat, timePickerBool, minDate, maxDate) {
            formatStyle = formatStyle || 'Y-m-d H:i';
            defValueformat = defValueformat || 'yyyy-MM-dd h:m';
            var currentDate = new Date().format(defValueformat);
            timePickerBool = (timePickerBool === undefined || timePickerBool === null) ? true : timePickerBool;
            var opts = {
                lang: 'en',
                value: hasDefValue ? currentDate : null,
                timepicker: timePickerBool,
                format: formatStyle,
                step: 1,
                minDate: minDate || false,
                maxDate: maxDate || false
            };
            $(el).datetimepicker(opts);
        },
        // 检查日期,interVals(间隔天数)
        checkTime: function(dateTime, ct, interVals) {
            if (!dateTime || !ct) {
                common.layMsg('Date can not be empty!!');
                return false;
            }
            if (_.isString(ct)) {
                dateTime = Date.parse(dateTime.replace(/-/g, "/"));
            } else {
                dateTime = Date.parse(dateTime);
            }
            if (_.isString(ct)) {
                ct = Date.parse(ct.replace(/-/g, "/"));
            } else {
                ct = Date.parse(ct);
            }
            var diffTimes = dateTime - ct;
            if (interVals) {
                var times = interVals * 24 * 60 * 60 * 1000;
                if (diffTimes < 0 || diffTimes > times) {
                    common.layMsg('The time period must be less than or equal to 3 days!');
                    return false;
                }
                return true;
            } else {
                if (diffTimes < 0) {
                    common.layMsg('End date must be greater than or equal to start date!');
                    return false;
                }
                return true;
            }
        },
        // 初始化下拉框
        initSelect: function(el, extendOpt, callback, selectedValue, options) {
            options = options || {};
            var defaultOpt = {
                width: '160px',
                placeholder_text_single: 'Select...',
                no_results_text: 'No match is found',
                disable_search_threshold: 6,
                search_contains: true,
                allow_single_deselect: true,
            };

            if (_.isNumber(selectedValue)) selectedValue += '';

            var selValArray = selectedValue ? selectedValue.split('|') : [];

            if (extendOpt && _.isObject(extendOpt)) {
                var html = '';
                for (var item in extendOpt) {
                    html += '<option value="' + item + '">' + extendOpt[item] + '</option>';
                }
                $(el).append(html);
                if (selValArray.length > 1) {
                    for (var i = 0; i < selValArray.length; i++) {
                        var value = selValArray[i];
                        $(el).children(" option[value='" + value + "']").attr('selected', true);
                    }
                }
            }
            if (_.isObject(options)) defaultOpt = $.extend(true, defaultOpt, options);

            if (selValArray.length === 1) {
                $(el).on('chosen:ready', function(evt, params) {
                    $(el).val(selectedValue);
                    $(el).trigger('chosen:updated');
                });
            }
            $(el).chosen(defaultOpt);
            $(el).on('change', function(evt, params) {
                if (callback) callback(params);
            });
        },
        directForm: function(data) {
            var direction = data.Direction;
            var directionDesc = '',
                degrees = 0;
            if (direction < 23 || direction > 338) {
                directionDesc = "North";
                degrees = 0;
            } else if (direction < 68) {
                directionDesc = "Northeast";
                degrees = 45;
            } else if (direction < 113) {
                directionDesc = "East";
                degrees = 90;
            } else if (direction < 157) {
                directionDesc = "Southeast";
                degrees = 135;
            } else if (direction < 203) {
                directionDesc = "South";
                degrees = 180;
            } else if (direction < 248) {
                directionDesc = "Southwest";
                degrees = 225;
            } else if (direction < 293) {
                directionDesc = "West";
                degrees = 270;
            } else {
                directionDesc = "Northwest";
                degrees = 315;
            }
            data.DirectionDesc = directionDesc;
            data.Degrees = degrees;
            return data;
        },
        // 区间日期,intervals间隔的天数
        initBetweenDateTime: function(startEl, endEl, interVals) {
            var currentDate = new Date().format('yyyy/MM/dd H:m');
            var opts = {
                lang: 'en',
                timepicker: true,
                format: 'Y/m/d H:i'
            };
            var startOpts = $.extend({}, opts, {
                maxDate: currentDate,
                // onChangeDateTime: function(ct, $input) {
                //     var endTime = $(endEl).val();
                //     common.checkTime(endTime, ct, interVals);
                // }
            });
            var endOpts = $.extend({}, opts, {
                maxDate: currentDate,
                // onChangeDateTime: function(ct, $input) {
                //     var startTime = $(startEl).val();
                //     common.checkTime(ct, startTime, interVals);
                // }
            });
            $(startEl).datetimepicker(startOpts);
            $(endEl).datetimepicker(endOpts);
        },
        dialog: function(content, opts) {
            dialog(content, $.extend({
                mask: true,
                titleClose: true
            }, opts));
        },
        layUI: function(opts) {
            opts = $.extend({}, {
                type: 1,
                shade: 0.5,
                btn: ['Close'],
                btn1: function() {
                    layer.closeAll();
                }
            }, opts)
            layer.open(opts);
        },
        layUIForm: function() {
            layui.use(['form'], function() {
                var form = layui.form()
                form.render('select');
                form.render('checkbox');
            });
        },
        layAlert: function(content, opt) {
            opt = opt || {};
            var options = $.extend({ icon: 2 }, opt);
            layer.alert(content, options);
            return false;
        },
        layMsg: function(content) {
            layer.msg(content, {
                offset: 't'
            });
        },
        layConfirm: function(content, callback) {
            layer.confirm(content, {
                btn: ['OK', 'Cancel'] //按钮
            }, function() {
                callback && callback();
            }, function() {
                layer.closeAll();
            });
        },
        // 自适应高度的dialog
        autoAdaptionDialog: function(content, opts, callback) {
            opts = _.isObject(opts) ? opts : {};
            var option = $.extend({}, {
                mask: true,
                titleClose: true,
                init: function() {
                    if (callback) callback(this);
                },
                buttons: []
            }, opts);
            dialog(content, option);
            // 通过js更改样式
            $('.pop-content.alert .content').css({
                'min-height': 0
            });
            $('.pop-content.alert .title').css({
                'text-align': 'left'
            });
        },
        // 通知提示
        toast: function(content, type) {
            type = type || 'error';
            var isSuccess = type === 'success';
            var textCls = isSuccess ? 'toastCls toastCls-success' : 'toastCls';
            var iconCls = isSuccess ? 'fa fa-check-square' : 'fa fa-exclamation-circle';
            var contentHtml = '<div class="' + textCls + '"><i class="' + iconCls + '"></i><span>' + content + '</span></div>';
            dialog(contentHtml, {
                type: 'toast',
                toastTime: 2000
            });
        },
        // alert对话框(内容，类型，是否有确定按钮，按钮回调函数)
        alert: function(content, type, hasOK, callback) {
            hasOK = hasOK || false;
            type = type || 'success';
            var isSuccess = type === 'success';
            var textCls = isSuccess ? 'alertCls-success' : 'alertCls-error';
            var iconCls = isSuccess ? 'fa fa-check-square' : 'fa fa-exclamation-circle';
            var contentHtml = '<div class="' + textCls + '"><i class="' + iconCls + '"></i><span>' + content + '</span></div>';
            dialog(contentHtml, {
                buttons: hasOK ? [{
                    name: 'OK',
                    callback: function(d) {
                        if (callback) callback();
                        d.close();
                    }
                }] : []
            });
            // 通过js更改样式
            $('.pop-content.alert .content').css({
                'margin-top': 0,
                'min-height': 0,
                'padding': 0
            });
        },
        // 序列化参数
        serialParam: function(data) {
            var str = '';
            if (data && _.isObject(data)) {
                $.each(data, function(key, value) {
                    str += key + '=' + value + '&';
                });
            }
            return str.substring(0, str.length - 1);
        },
        // 更改hash
        changeHash: function(url, param) {
            window.location.hash = url + this.serialParam(param);
        },
        stopMonitorTimer: function() {
            if (window.monitorTimer) {
                clearInterval(window.monitorTimer);
            }
        },
        // 清除locationStorage
        clearData: function() {
            this.stopMonitorTimer();
            common.setCookie('accountid', '', -1);
            common.setCookie('usertype', '', -1);
            common.setCookie('orgno', '', -1);
            common.setCookie('token', '', -1);
            common.removeLocationStorage('arrVids');
            common.removeLocationStorage('historyLocationParams'); //历史位置查询
            common.removeLocationStorage('carManagerParams'); //车辆管理            
            common.removeLocationStorage('userManagerParams'); //组织用户
            common.removeLocationStorage('roleManagerSearchParams'); //角色管理            
            common.removeLocationStorage('landMarkPointParams'); //地标点管理
        },
        // 根据key获取查询条件，param:历史查询参数(传递true则更新为新的查询参数)，
        // newParam：新的查询参数，hasDefaultPage：参数默认传递page参数，默认为true
        getParams: function(key, param, newParam, hasDefaultPage) {
            hasDefaultPage = _.isBoolean(hasDefaultPage) ? hasDefaultPage : true;
            var searchParam = {};
            if (_.isBoolean(param) && param) {
                searchParam = newParam;
            } else {
                var strlocalStorageParam = common.getlocationStorage(key);
                var localStorageParam = JSON.parse(strlocalStorageParam);
                if (param && _.isObject(param) && !_.isEmpty(param)) {
                    searchParam = param;
                } else if (strlocalStorageParam && _.isObject(localStorageParam) && !_.isEmpty(localStorageParam)) {
                    searchParam = localStorageParam;
                }
            }
            if (!_.isEmpty(searchParam)) {
                searchParam.PageIndex = searchParam.PageIndex || 1;
                searchParam.PageSize = 20;
            } else {
                if (hasDefaultPage) {
                    searchParam.PageIndex = 1;
                    searchParam.PageSize = 20;
                }
            }
            return searchParam;
        },
        // 公共函数
        page: function(totalCount, pageSize, currPage, callback, el) {
            totalCount = totalCount || 0;
            pageSize = pageSize || 20;
            currPage = currPage || 1;
            el = el || '#page';
            if (_.isString(pageSize)) {
                pageSize = parseInt(pageSize);
                if (_.isNaN(pageSize)) pageSize = 20;
            }
            if (_.isString(currPage)) {
                currPage = parseInt(currPage);
                if (_.isNaN(currPage)) currPage = 1;
            }
            page.init({
                $dom: $(el),
                totalPage: Math.ceil((totalCount / pageSize) > 1 ? (totalCount / pageSize) : 1),
                totalNumber: totalCount,
                currentPage: currPage,
                callback: function(page) {
                    if (callback && _.isFunction(callback)) callback(page);
                }
            });
        },
        // confirm确认框
        confirm: function(content, callback) {
            var contentHtml = '<div class="confirmCls">' + content + '</div>';
            dialog(contentHtml, {
                type: 'confirm',
                title: 'Hint',
                titleClose: true,
                buttons: [{
                    name: 'OK',
                    callback: function(d) {
                        if (callback) callback();
                        d.close();
                    }
                }, {
                    name: 'Cancel',
                    callback: function(d) {
                        d.close();
                    }
                }]
            });
            // 通过js更改样式
            $('.pop-content.confirm .content').css({
                'min-height': 0
            });
        },
        // 遮罩层
        loading: function(status) {
            status = status || 'hide';
            if ($('#loading').size() < 1) {
                $('<div id="loading"></div>').appendTo('body');
            }
            if (status === 'show') {
                $('#loading').show();
            } else {
                $('#loading').hide();
            }
        },
        // set cookie
        setCookie: function(name, value, expireDay) {
            expireDay = expireDay || 7;
            $.cookie(name, value, {
                expires: expireDay
            });
        },
        // get cookie
        getCookie: function(name) {
            return $.cookie(name);
        },
        // set locationStorage
        setlocationStorage: function(key, value) {
            window.localStorage.setItem(key, value);
        },
        // get locationStorage
        getlocationStorage: function(key) {
            return window.localStorage.getItem(key);
        },
        // remove locationStorage
        removeLocationStorage: function(key) {
            window.localStorage.removeItem(key);
        },
        getElValue: function(el, type) {
            type = type || 'value';
            if (type === 'value') {
                return $.trim($(el).val());
            } else {
                return $.trim($(el).text());
            }
        },
        setElValue: function(el, value) {
            $(el).val(value);
        },
        // 获取表单提交数据
        getFormData: function(el) {
            var inputs = $(el).find(':input').not('[data-nosubmit="true"]');
            var formData = {};
            $(inputs).each(function(index, input) {
                var name = null,
                    value = null;
                name = $(input).attr('name');
                if (name) {
                    if ($(input).is(':checkbox')) {
                        var isChecked = $(input).is(':checked');
                        value = isChecked ? $(input).data('chkvalue') : $(input).data('unchkvalue');
                    } else if ($(input)[0].tagName === 'SELECT') {
                        value = $(input).children('option:selected').val();
                    } else {
                        value = $(input).val();
                    }
                    formData[name] = value;
                }
            });
            return formData;
        },
        setFormData: function(el, data) {
            if (data && !$.isEmptyObject(data)) {
                var inputs = $(el).find(':input');
                var name = null;
                $(inputs).each(function(index, input) {
                    name = $(input).attr('name');
                    if (name) {
                        if ($(input)[0].tagName === 'SELECT') {
                            $(input).val(data[name]);
                        } else {
                            $(input).val(data[name]);
                        }
                    }
                });
            }
        },
        simpleAjax: function(url, param) {
            var me = this;
            param = param || {};
            param.sid = this.getCookie('sid');
            param.st = this.getCookie('st');
            return $.ajax({
                type: "POST",
                url: url,
                data: param,
                dataType: 'json',
                cache: false
            });
        },
        getBundle: function() {
            var urls = Array.prototype.slice.call(arguments);
            var requests = $.map(urls, function(item) {
                if (_.isString(item)) {
                    return $.get(item);
                } else {
                    return item.done ? item : $.get(item.url, item.data);
                }
            });
            var deferred = $.Deferred();
            $.when.apply($, requests).done(function() {
                var args = _.toArray(arguments);
                var result = _.map(args, function(prop) {
                    return _.isArray(prop) ? (prop[1] === 'success' ? prop[0] : prop) : prop;
                });
                deferred.resolve.apply(deferred, result);
            }).fail(function() {
                deferred.reject(arguments);
            });
            return deferred.promise();
        },
        // ajax封装
        ajax: function(url, param, callback, opts, ajaxOpt) {
            var me = this;
            param = param || {};
            opts = opts || {};
            ajaxOpt = ajaxOpt || {};
            // 不是登录，则需要传递sid,st参数
            if (opts.action !== 'login') {
                param.AccountId = this.getCookie('accountid');
                param.UserType = this.getCookie('usertype');
                param.OrgNo = this.getCookie('orgno');
                param.Token = this.getCookie('token');
            }
            return $.ajax($.extend(true, {
                type: "POST",
                url: url,
                data: param,
                dataType: 'json',
                cache: false,
                success: function(res) {
                    if (callback && typeof callback === 'function') {
                        callback.call(this, res);
                    }
                },
                //若异常，则弹窗提示
                error: function(xmlHttpRequest) {
                    if (opts.action === 'login') {
                        $('#btn-login').removeAttr('disabled', 'disabled');
                    } else {
                        me.loading();
                        me.layAlert('请求失败，请联系管理员！', { icon: 2 });
                        // 如果sid，st为null，则跳转到登录页
                        var accountid = me.getCookie('accountid');
                        var usertype = me.getCookie('usertype');
                        var orgno = me.getCookie('orgno');
                        var token = me.getCookie('token');
                        if (!accountid || !usertype || !orgno || !token) {
                            me.clearData();
                            window.location.hash = '#login/login';
                        }
                    }
                }
            }, ajaxOpt));
        },
        // 所属机构-查询公共组件(callback代表选择了某一项的回调函数)
        listenOrganization: function(callback) {
            var me = this;
            $('#main-content').off()

            .on('input propertychange', 'input[name="orgName"]', function(e) {
                var value = $.trim($(this).val());
                common.setElValue(':hidden[name="OnlyOrgNo"]', '');
                if (value.length >= 3) {
                    me.getOrganizationList(value);
                }
            }).on('click', 'ul.ul-select a', function() {
                var orgId = $(this).data('orgid');
                var orgName = $(this).data('name');
                common.setElValue(':hidden[name="OnlyOrgNo"]', orgId);
                common.setElValue('input[name="orgName"]', orgName);
                $(this).closest('ul.ul-select').addClass('hidden');
                if (callback) callback(orgId, orgName);
            });
        },
        // 所属机构-查询结果列表
        getOrganizationList: function(value) {
            value = $.trim(value);
            if (!value || value.length < 3) {
                common.layMsg('至少输入3个字符进行搜索');
                $('input[name="orgName"]').focus();
                return false;
            }
            common.ajax(api.carManager.orgList, {
                OnlyOrgName: value
            }, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    var html = '';
                    if (data && data.length > 0) {
                        $.each(data, function(i, item) {
                            html += '<li><a href="javascript:" data-name="' + item.Name + '" data-orgid="' + item.Id + '">' + item.Name + '</a></li>';
                        });
                    } else {
                        html = '<li><span>未找到相关数据项！</span></li>';
                    }
                    $('ul.ul-select').removeClass('hidden').empty().html(html);
                }
            });
        },
        // ztree查询
        searchTree: function() {
            var me = this;
            $('#searchTreeText').bind("input propertychange", function() {
                var treeText = $(this).val();
                me.treefilter('vehicleTree', treeText);
            });
        },
        treefilter: function(treeId, treeText) {
            var zTree = $.fn.zTree.getZTreeObj(treeId);
            if (treeText) {
                nodeList = zTree.getNodes();
                nodeList = zTree.transformToArray(nodeList);
                zTree.hideNodes(nodeList); //先隐藏所有节点
                nodeList = zTree.getNodesByParamFuzzy("Name", treeText);
                outNodeList = zTree.getNodesByParamFuzzy("Name", treeText);
                for (var i = 0; i < nodeList.length; i++) {
                    this.findParent(zTree, nodeList[i]); //递归获取父节点
                    this.findChild(zTree, nodeList[i]); //递归获取子节点
                }
            } else {
                outNodeList = zTree.transformToArray(zTree.getNodes());
            }
            zTree.showNodes(outNodeList); //再展示匹配到的节点
        },
        findParent: function(zTree, node) {
            var pNode = node.getParentNode();
            if (pNode) {
                outNodeList.push(pNode);
                this.findParent(zTree, pNode);
            }
        },
        findChild: function(zTree, node) {
            var pNodes = node.children;
            if (pNodes) {
                for (var i = 0; i < pNodes.length; i++) {
                    outNodeList.push(pNodes[i]);
                    this.findChild(zTree, pNodes[i]);
                }
            }
        },
        // 获取选择组织value
        getTreeNodeSelected: function(treeId) {
            var arrVids = [];
            //获取被选中项
            var treeObj = $.fn.zTree.getZTreeObj(treeId);
            var nodes = treeObj.getCheckedNodes(true) || [];
            //重新填充数据
            for (var i = 0; i < nodes.length; i++) {
                if (!nodes[i].isParent) {
                    arrVids.push(nodes[i].Id);
                }
            }
            return arrVids.join(",");
        },
        tableSort: function(callback) {
            var me = this;
            $('.datatable-header').on('click', 'th.sortable', function() {
                var field = $(this).data('sortfield');
                var order = $(this).data('sortorder');
                order = order || 'asc';
                $(this).data('sortorder', order === 'asc' ? 'desc' : 'asc');
                var params = {
                    sortField: field,
                    sortType: order
                };
                if ($('.datatable-content tbody > tr').size() < 1) {
                    return false;
                }
                if (order === 'asc') {
                    $(this).removeClass('asc').addClass('desc');
                } else {
                    $(this).removeClass('desc').addClass('asc');
                }
                if (callback) callback(params);
            });
        },
        getSelect: function(opt, callback) {
            var obj = {
                url: opt.url,
                params: opt.params || {},
                errorMsg: opt.errorMsg || 'Request error, no data requested',
                key: opt.key || ['id', 'name'],
                $objs: opt.obj,
                selected: opt.selected,
                isall: opt.isall
            };
            common.ajax(obj.url, obj.params, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    var html = obj.isall ? '<option value="0">全部</option>' : '';
                    if (data && data.length > 0) {
                        $.each(data, function(i, item) {
                            html += '<option value="' + item[obj.key[0]] + '">' + item[obj.key[1]] + '</option>';
                        });
                    }
                    obj.$objs.html(html);
                    obj.selected && obj.$objs.val(obj.selected);
                    callback && callback();
                } else {
                    var msg = res.errorMsg || obj.errorMsg;
                    common.layMsg(msg);
                }
            });
        },
        // 获取用户权限菜单
        getUserMenu: function(callback) {
            var reportArray = [],
                monitorArray = [],
                userArray = [],
                orderArray = [],
                resourceArray = [],
                array = [];
            this.ajax(api.userPermission, {}, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var data = res.content || [];
                    if (data.length > 0) {
                        // 变量赋值
                        roleCodeList = data;
                        for (var i = 0; i < data.length; i++) {
                            var menu = _.find(rolesMenu, function(item, index) {
                                return item.code === data[i];
                            });
                            if (menu) {
                                switch (menu.group) {
                                    case 'carmonitor':
                                        monitorArray.push(menu);
                                        break;
                                    case 'users':
                                        userArray.push(menu);
                                        break;
                                    case 'order':
                                        orderArray.push(menu);
                                        break;
                                    case 'resource':
                                        resourceArray.push(menu);
                                        break;
                                    case 'report':
                                        reportArray.push(menu);
                                        break;
                                }
                            }
                        }
                        array.push(reportArray, monitorArray, userArray, orderArray, resourceArray);
                    }
                    if (callback) callback(array);
                } else {
                    var msg = res.errorMsg || 'Permission to get failed, please contact the administrator!';
                    this.toast(msg);
                }
            });
        },
    };
    return common;
});