define(function(require, exports, module) {
    'use strict';

    //datapicker
    var datapicker = require('datepicker');
    var tpls = {
        odbInfo: require('../../tpl/carMonitor/odb')
    };
    var api = require('api');
    var page = require('page');
    require('lodash');
    require('chosen');
    require('zTree');
    require('excheck');
    require('exhide');
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
            name: '车辆监控',
            code: '00016',
            url: '#carMonitor/index',
            groupname: '位置监控',
            group: 'carmonitor',
            icon: 'icon-position'
        }, {
            name: '历史位置查询',
            code: '00011',
            url: '#historyLocation/index',
            groupname: '位置监控',
            group: 'carmonitor',
            icon: 'icon-position'
        }, {
            name: '围栏管理',
            code: '00033',
            url: '#geofenceManager/index',
            groupname: '位置监控',
            group: 'carmonitor',
            icon: 'icon-position'
        }, {
            name: '地标点管理',
            code: '00030',
            url: '#landmarkPointManager/index',
            groupname: '位置监控',
            group: 'carmonitor',
            icon: 'icon-position'
        }, {
            name: '组织管理',
            code: '00043',
            url: '#organizetionManager/index',
            groupname: '组织机构',
            group: 'users',
            icon: 'icon-org'
        }, {
            name: '用户管理',
            code: '00007',
            url: '#userManager/index',
            groupname: '组织机构',
            group: 'users',
            icon: 'icon-org'
        }, {
            name: '角色管理',
            code: '00006',
            url: '#roleManager/index',
            groupname: '组织机构',
            group: 'users',
            icon: 'icon-org'
        },
        {
            name: '车辆管理',
            code: '00005',
            url: '#carManager/index',
            groupname: '车辆信息',
            group: 'resource',
            icon: 'icon-car'
        }, {
            name: '指令发送',
            code: '00029',
            url: '#sendCode/index',
            groupname: '车辆信息',
            group: 'resource',
            icon: 'icon-car'
        }, {
            name: '车辆里程报表',
            code: '00034',
            url: '#mileageReport/index',
            groupname: '报表管理',
            group: 'report',
            icon: 'icon-report'
        }, {
            name: 'OBD报表',
            code: '00035',
            url: '#OBDReport/index',
            groupname: '报表管理',
            group: 'report',
            icon: 'icon-report'
        }, {
            name: '报警报表',
            code: '00036',
            url: '#alarmReport/index',
            groupname: '报表管理',
            group: 'report',
            icon: 'icon-report'
        }, {
            name: '系统日志',
            code: '00038',
            url: '#systemLog/index',
            groupname: '系统管理',
            group: 'system',
            icon: 'icon-sys'
        }, {
            name: '续费记录',
            code: '00040',
            url: '#renewLog/index',
            groupname: '运营管理',
            group: 'Operations',
            icon: 'icon-operation'
        }, {
            name: '服务到期',
            code: '00041',
            url: '#serviceDue/index',
            groupname: '运营管理',
            group: 'Operations',
            icon: 'icon-operation'
        }, {
            name: '发票管理',
            code: '00042',
            url: '#invoiceManager/index',
            groupname: '运营管理',
            group: 'Operations',
            icon: 'icon-operation'
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
        return key ? key : '--';
    });
    template.helper('geofenceStatus', function(key) {
        if (_.isNumber(key)) {
            return key ? '打开' : '关闭';
        }
        return '';
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
                    var obdInfo = data.mObdInfo;
                    var obdStatus = data.mObdStatus;
                    $('.obd-Content').empty().html(template.compile(tpls.odbInfo)({
                        obdInfo: obdInfo,
                        obdStatus: obdStatus
                    }));
                    $('#obdList').removeClass('hidden');
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    me.layMsg(msg);
                }
            });
        },
        // 日期区间选择
        initDateRangeChange: function(type, _startTime, _endTime) {
            _startTime = _startTime || '';
            _endTime = _endTime || '';
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
            if (_startTime) {
                startTime = _startTime;
            }
            if (_endTime) {
                endTime = _endTime;
            }
            if (!_startTime && !_endTime && type == 'custom') {
                startTime = endTime = null;
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
                lang: 'ch',
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
                common.layMsg('日期不能为空!');
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
                    common.layMsg('时间周期必须小于或等于3天!');
                    return false;
                }
                return true;
            } else {
                if (diffTimes < 0) {
                    common.layMsg('结束日期必须大于或等于开始日期!');
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
                placeholder_text_single: '请选择...',
                no_results_text: '未找到匹配项',
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
                directionDesc = "北";
                degrees = 0;
            } else if (direction < 68) {
                directionDesc = "东北";
                degrees = 45;
            } else if (direction < 113) {
                directionDesc = "东";
                degrees = 90;
            } else if (direction < 157) {
                directionDesc = "东南";
                degrees = 135;
            } else if (direction < 203) {
                directionDesc = "南";
                degrees = 180;
            } else if (direction < 248) {
                directionDesc = "西南";
                degrees = 225;
            } else if (direction < 293) {
                directionDesc = "西";
                degrees = 270;
            } else {
                directionDesc = "西北";
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
                lang: 'ch',
                timepicker: true,
                format: 'Y/m/d H:i'
            };
            var startOpts = $.extend({}, opts, {
                maxDate: currentDate
            });
            var endOpts = $.extend({}, opts, {
                maxDate: currentDate
            });
            $(startEl).datetimepicker(startOpts);
            $(endEl).datetimepicker(endOpts);
        },
        layUI: function(opts) {
            opts = $.extend({}, {
                type: 1,
                shade: 0.5,
                btn: ['关 闭'],
                btn1: function() {
                    layer.closeAll();
                }
            }, opts)
            layer.open(opts);
        },
        layUIForm: function(opt) {
            opt = opt || {};
            var defaultOpt = $.extend({
                callback: null,
                renderCheckbox: true
            }, opt);
            layui.use(['form'], function() {
                var form = layui.form()
                form.render('select');
                if (defaultOpt.renderCheckbox) {
                    form.render('checkbox');
                }
                setTimeout(function() {
                    defaultOpt.callback && defaultOpt.callback();
                }, 500);
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
                btn: ['确定', '取消'] //按钮
            }, function() {
                callback && callback();
            }, function() {
                layer.closeAll();
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
                    formData[name] = $.trim(value);
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
            param.Language = 'zh-cn';
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
                errorMsg: opt.errorMsg || '请求错误，未请求到数据',
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
                            var vid = obj.key[2] ? obj.key[2] : '';
                            html += '<option value="' + item[obj.key[0]] + '" vid="' + (vid ? item[vid] : '') + '">' + item[obj.key[1]] + '</option>';
                        });
                    }
                    obj.$objs.append(html);
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
                systemArray = [],
                operationArray = [],
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
                                    case 'system':
                                        systemArray.push(menu);
                                        break;
                                    case 'Operations':
                                        operationArray.push(menu);
                                        break;
                                }
                            }
                        }
                        array.push(reportArray, monitorArray, userArray, orderArray, resourceArray, systemArray, operationArray);
                    }
                    if (callback) callback(array);
                } else {
                    var msg = res.errorMsg || '权限获取失败,请联系管理员!';
                    this.toast(msg);
                }
            });
        },
        // 所属机构--tree
        subordinateTree: function(option) {
            option = option || {};
            var opt = $.extend({}, {
                loadDevice: _.isBoolean(option.loadDevice) ? option.loadDevice : true,
                loadPlateNum: _.isBoolean(option.loadPlateNum) ? option.loadPlateNum : true,
                loadSIM: _.isBoolean(option.loadSIM) ? option.loadSIM : true,
                loadAlarm: _.isBoolean(option.loadAlarm) ? option.loadAlarm : false, // 默认不加载报警类型
                callback: option.callback || null
            }, option);
            var me = this;
            $('.js-Subordinate').on('click', function() {
                $(this).toggleClass('layui-form-selected');
            });
            var ztreeSetting = {
                view: {
                    selectedMulti: false,
                    showIcon: false
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "OrgId",
                        pIdKey: "ParentOrgId",
                        rootPId: null
                    },
                    key: {
                        name: "OrganizationName"
                    }
                },
                callback: {
                    onClick: zTreeOnClick
                }
            };
            this.ajax(api.subordinateTree, {}, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var content = res.content || [];
                    $.fn.zTree.init($("#orgTree"), ztreeSetting, content);
                    var treeObj = $.fn.zTree.getZTreeObj("orgTree");
                    treeObj.expandAll(true);
                }
            });

            function loadData(orgNo) {
                // 获取设备编号
                if (opt.loadDevice) {
                    me.getDeviceNum(orgNo, opt.EquipmentNo);
                }
                // 获取车辆牌号
                if (opt.loadPlateNum) {
                    me.getPlateNum(orgNo, opt.PlateNo);
                }
                // 获取sim卡号
                if (opt.loadSIM) {
                    me.getSIMList(orgNo, opt.SimCardNo);
                }
            }

            function zTreeOnClick(event, treeId, treeNode) {
                var name = treeNode.OrganizationName;
                var orgNo = treeNode.OrgNo;
                event.stopPropagation();
                event.preventDefault();
                $('.js-Subordinate').removeClass('layui-form-selected');
                $('input[name="txtSubordinate"]').data('orgNo', orgNo).val(name);
                opt.callback && opt.callback(orgNo, name);
                loadData(orgNo);
            }
            // 外部传入，获取数据
            if (opt.orgNo) {
                $('#txtSubordinate').data('orgNo', opt.orgNo);
                loadData(opt.orgNo);
            }
            // 获取警情
            if (opt.loadAlarm) {
                me.getAlarmTypeList(opt.AlarmCode);
            }
            if (opt.timeType) {
                $('span.time-area[data-type=' + opt.timeType + ']').addClass('active').siblings().removeClass('active');
                this.initDateRangeChange(opt.timeType, opt.startTime, opt.endTime);
            }
        },
        // 重置下拉框和内容
        resetSelect: function(el) {
            $(el).children('option:gt(0)').remove();
            $(el).next().find(':text').val('').end().find('dl').empty();
        },
        // 获取设备编号
        getDeviceNum: function(orgNo, currentVal) {
            var me = this;
            this.resetSelect('#selDevice');
            me.getSelect({
                url: api.getDevice,
                params: {
                    OrgNo: orgNo
                },
                key: ['EquipmentId', 'EquipmentNo'],
                obj: $('#selDevice')
            }, function() {
                me.layUIForm({
                    renderCheckbox: false
                });
                if (currentVal) {
                    $('#selDevice').val(currentVal).next().find(':text');
                    var txtDevice = $('#selDevice > option:selected').text();
                    $('#selDevice').next().find(':text').val(txtDevice).end().find('dd[lay-value=' + currentVal + ']')
                        .addClass('layui-this');
                }
            });
        },
        // 获取车牌号码
        getPlateNum: function(orgNo, currentVal) {
            var me = this;
            this.resetSelect('#selPlateNumber');
            me.getSelect({
                url: api.getLienceList,
                params: {
                    OrgNo: orgNo
                },
                key: ['PlateNo', 'PlateNo', 'Vid'],
                obj: $('#selPlateNumber')
            }, function() {
                me.layUIForm({
                    renderCheckbox: false
                });
                if (currentVal) {
                    $('#selPlateNumber').val(currentVal).next().find(':text')
                        .val(currentVal).end().find('dd[lay-value=' + currentVal + ']')
                        .addClass('layui-this');
                }
            });
        },
        // 获取sim卡号
        getSIMList: function(orgNo, currentVal) {
            var me = this;
            this.resetSelect('#selSIM');
            me.getSelect({
                url: api.getSIMList,
                params: {
                    OrgNo: orgNo
                },
                key: ['SimCardNo', 'SimCardNo'],
                obj: $('#selSIM')
            }, function() {
                me.layUIForm({
                    renderCheckbox: false
                });
                if (currentVal) {
                    $('#selSIM').val(currentVal).next().find(':text')
                        .val(currentVal).end().find('dd[lay-value=' + currentVal + ']')
                        .addClass('layui-this');
                }
            });
        },
        // 获取警情
        getAlarmTypeList: function(currentVal) {
            var me = this;
            this.resetSelect('#selAlarm');
            me.getSelect({
                url: api.getAlarmList,
                params: {},
                key: ['AlarmCode', 'AlarmText'],
                obj: $('#selAlarm')
            }, function() {
                me.layUIForm({
                    renderCheckbox: false
                });
                if (currentVal) {
                    $('#selAlarm').val(currentVal);
                    var txtAlarm = $('#selAlarm > option:selected').text();
                    $('#selAlarm').next().find(':text')
                        .val(txtAlarm).end().find('dd[lay-value=' + currentVal + ']')
                        .addClass('layui-this');
                }
            });
        }
    };
    return common;
});