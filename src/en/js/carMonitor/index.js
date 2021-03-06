define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    require('zTree');
    require('excheck');
    require('exhide');
    var map = require('google');
    // 模板
    var tpls = {
        index: require('../../tpl/carMonitor/index'),
        carList: require('../../tpl/carMonitor/list'),
        carDetail: require('../../tpl/carMonitor/carDetail'),
        directive: require('../../tpl/carMonitor/directive'),
        alarm: require('../../tpl/carMonitor/alarm'),
        alarmList: require('../../tpl/carMonitor/alarmList')
    };

    function carMonitor() {
        window.monitorTimer = null;
    }

    $.extend(carMonitor.prototype, {
        init: function(param) {
            var me = this;
            // 赋值为null是为了,地图infowindow里面的轨迹回放返回,重新加载导致timer计时器未clear
            window.monitorTimer = null;
            $('#main-content').empty().html(template.compile(tpls.index)());
            map.init('monitorMap');
            map.addDrawing(function(param) {
                me.getDrawData(param);
            });
            //me.getAlarmCount();
            this.initControl();
        },
        // 初始化控件
        initControl: function() {
            var me = this;
            this.event();
            this.initZTree();
            common.tableSort(function(_sortParam) {
                me.getCarPositionList(null, true, _sortParam);
            });
        },
        // 获取未处理报警数量
        getAlarmCount: function() {
            common.ajax(api.getAlarmCount, {}, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var count = res.content || 0;
                    $('.js_alarmCount').text(count);
                } else {
                    var msg = res.errorMsg || 'System error, please contact the administrator!';
                    common.layMsg(msg);
                }
            });
        },
        getDrawData: function(param) {
            var me = this;
            param = param || {};
            common.loading('show');
            common.ajax(api.areaQuery, param, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var data = res.content || [];
                    me.initCarMonitorList(data);
                } else {
                    var msg = res.errorMsg || 'System error, please contact the administrator!';
                    common.layMsg(msg);
                }
                common.loading();
            });
        },
        // 初始化车辆监控列表
        initCarMonitorList: function(data, monitorStart) {
            var me = this;
            $('#carMonitorList > table > tbody').empty().html(template.compile(tpls.carList)({
                data: data
            }));
            // 清除数据
            map.clearData();
            for (var i = 0; i < data.length; i++) {
                data[i] = common.directForm(data[i]);
                map.addMonitorMark(data[i]);
            }
            // 绑定监控表格行单击事件
            map.bindMonitorListEvent();
            // 统计
            me.monitorSummary(data);
            if (monitorStart) {
                // 开启监控
                me.startMonitorTimer();
            }
            // 获取OBD信息
            if (data && data.length > 0) {
                $('.ul-tab > li:eq(0)').addClass('active').siblings().removeClass('active');
                common.getOBDInfo(data[0].Vid);
            }
        },
        initZTree: function() {
            var me = this;
            //组织列表树设置
            var ztreeSetting = {
                check: {
                    enable: true,
                    chkStyle: "checkbox"
                },
                view: {
                    selectedMulti: false
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "Id",
                        pIdKey: "Pid",
                        rootPId: null
                    },
                    key: {
                        name: "Name",
                        checked: "IsCheck"
                    }

                }
            };
            common.ajax(api.vehicleList, {}, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var data = res.content || [];
                    $.fn.zTree.init($("#vehicleTree"), ztreeSetting, data);
                    //展开节点
                    var treeObj = $.fn.zTree.getZTreeObj("vehicleTree");
                    treeObj.expandAll(true);
                    treeObj.checkAllNodes(true);
                    var arrVids = common.getlocationStorage('arrVids');
                    if (arrVids) {
                        // 取值默认选中tree
                        var ids = arrVids.split(',');
                        for (var i = 0; i < ids.length; i++) {
                            var node = treeObj.getNodeByParam('Id', ids[i]);
                            treeObj.checkNode(node, true, true);
                        }
                        // 获取列表
                        me.getCarPositionList(arrVids, true);
                    } else {
                        me.getCarPositionList(null, true);
                    }
                    // tree查询
                    common.searchTree();
                } else {
                    var msg = res.errorMsg || 'System error, please contact the administrator!';
                    common.layMsg(msg);
                }
            });
        },
        // 统计车辆信息
        monitorSummary: function(data) {
            var onlineCount = 0;
            var offLineCount = 0;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                if (item.VehicleStatus === 'Offline') {
                    offLineCount += 1;
                } else {
                    onlineCount += 1;
                }
            }
            $('.js-carTotal').text(data.length);
            $('.js-onLineTotal').text(onlineCount);
            $('.js-offLineTotal').text(offLineCount);
        },
        startMonitorTimer: function() {
            var me = this;
            if (!window.monitorTimer) {
                window.monitorTimer = setInterval(function() {
                    common.clearSort();
                    me.getCarPositionList();
                }, 15000);
            }
        },
        carDetailInfo: function(id) {
            var me = this;
            common.ajax(api.carManager.detail, { vid: id }, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var data = res.content;
                    var html = template.compile(tpls.carDetail)({
                        data: data
                    });
                    common.layUI({
                        title: 'Vechile Info.',
                        area: '700px',
                        content: html
                    });
                } else {
                    var msg = res.errorMsg || 'System error, please contact the administrator!';
                    common.layMsg(msg);
                }
            });
        },
        // 指令设置公共函数
        setDirective: function(url, param, callback) {
            common.loading('show');
            common.ajax(url, param, function(res) {
                if (res && res.status === 'SUCCESS') {
                    if (callback) {
                        callback();
                    } else {
                        common.layMsg('Setup is successful!');
                    }
                } else {
                    var msg = res.errorMsg || 'System error, please contact the administrator!';
                    common.layAlert(msg, { icon: 2 });
                }
            }).always(function() {
                common.loading();
            });
        },
        // 获取指令默认值
        getDirectiveInfo: function(vid) {
            var me = this;
            common.loading('show');
            common.ajax(api.directiveInfo, { vid: vid }, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var content = res.content;
                    var html = template.compile(tpls.directive)({
                        data: content
                    });
                    common.layUI({
                        title: 'Commands',
                        area: '700px',
                        id: 'directForm',
                        btn: [],
                        content: html,
                        success: function(el) {
                            common.layUIForm();
                            $('select[name="sensitivity"]').val(content.Sensitivity || 3);
                            // 里程设置
                            $(el).find('.js-setMilage').on('click', function() {
                                var milage = $.trim($('input[name="txtMilage"]').val());
                                if (/^\d+(\.\d{1,2})?$/.test(milage) && milage >= 0 && milage <= 999999.99) {
                                    var param = {
                                        vid: vid,
                                        Distance: milage
                                    };
                                    me.setDirective(api.setMilage, param);
                                } else {
                                    common.layAlert('only a number within (0-999999.99)!');
                                }
                            });
                            // 灵敏度
                            $(el).find('.js-sensitivity').on('click', function() {
                                var sensitivity = $('select[name="sensitivity"]').val();
                                var param = {
                                    vid: vid,
                                    Sensitivity: sensitivity
                                };
                                me.setDirective(api.setSensitivity, param);
                            });
                            // 超速设置
                            $(el).find('.js-speeding').on('click', function() {
                                var speeding = $.trim($('input[name="txtSpeeding"]').val());
                                if (speeding && /^\d*$/.test(speeding) && speeding > 40 && speeding < 150) {
                                    var param = {
                                        vid: vid,
                                        MaxSpeed: speeding
                                    };
                                    me.setDirective(api.setSpeeding, param);
                                } else {
                                    common.layAlert('only an integer within (40-150)');
                                }
                            });
                            // 设防、撤防
                            $(el).find('.js-arm').on('click', function() {
                                var enable = parseInt($(this).attr('data-enable'));
                                var param = {
                                    vid: vid,
                                    Enable: enable
                                };
                                me.setDirective(api.setSecurity, param);
                            });
                            // 恢复、断开油电
                            $(el).find('.js-fuel').on('click', function() {
                                var enable = parseInt($(this).attr('data-enable'));
                                var param = {
                                    vid: vid,
                                    Enable: enable
                                };
                                me.setDirective(api.setOilelectricity, param);
                            });
                            // 围栏打开或关闭
                            $(el).find('.js-fence').on('click', function() {
                                var enable = parseInt($(this).attr('data-enable'));
                                var param = {
                                    vid: vid,
                                    Enable: enable
                                };
                                me.setDirective(api.setArea, param);
                            });
                            // 报警电话设置
                            $(el).find('.js-alarmPhone').on('click', function() {
                                var rows = $('#setAlarmPhone .layui-form-row')
                                var array = [];
                                $.each(rows, function(index, item) {
                                    var keyId = $(item).attr('keyId');
                                    array.push({
                                        KeyId: keyId,
                                        Vid: vid,
                                        FullName: $.trim($(item).find('input[name="FullName"]').val()),
                                        Phone: $.trim($(item).find('input[name="Phone"]').val())
                                    });
                                });
                                common.loading('show');
                                common.ajax(api.setNoticecenter, { NoticeCenter: JSON.stringify(array) }, function(res) {
                                    if (res && res.status === 'SUCCESS') {
                                        common.layMsg('Setup is successful!');
                                    } else {
                                        var msg = res.errorMsg || 'System error, please contact the administrator!';
                                        common.layAlert(msg, { icon: 2 });
                                    }
                                }).always(function() {
                                    common.loading();
                                });
                            });
                        }
                    });
                } else {
                    var msg = res.errorMsg || 'System error, please contact the administrator!';
                    common.layAlert(msg, { icon: 2 });
                }
            }).always(function() {
                common.loading();
            });
        },
        // 获取车辆位置列表
        getCarPositionList: function(arrVids, isloading, sortParam) {
            var loadStatus = isloading ? 'show' : 'hide';
            var me = this;
            var arrVid = arrVids ? arrVids : common.getTreeNodeSelected('vehicleTree');
            common.setlocationStorage('arrVids', arrVid);
            if (arrVid) {
                common.loading(loadStatus);
                common.ajax(api.carPositionList, $.extend({ ArrVid: arrVid }, sortParam || {}), function(res) {
                    if (res && res.status === 'SUCCESS') {
                        var data = res.content || [];
                        me.initCarMonitorList(data, true);
                    } else {
                        var msg = res.errorMsg || 'System error, please contact the administrator!';
                        common.layMsg(msg);
                    }
                    common.loading();
                });
            }
        },
        getAlarmData: function(param) {
            param = param || {
                AlarmCode: '',
                PlateNo: ''
            }
            common.ajax(api.getAlarmInfo, param, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var data = res.content || [];
                    $('#tbAlarmList').empty().html(template.compile(tpls.alarmList)({ data: data }));
                    $('.js_alarm_total').text(data.length);
                } else {
                    var msg = res.errorMsg || 'System error, please contact the administrator!';
                    common.layMsg(msg);
                }
            });
        },
        processAlarm: function(id) {
            common.ajax(api.processAlarm, {
                KeyId: id
            }, function(res) {
                if (res && res.status === 'SUCCESS') {
                    common.layMsg('Operator Success!');
                    $('.js_alarm_search').click();
                } else {
                    var msg = res.errorMsg || 'System error, please contact the administrator!';
                    common.layMsg(msg);
                }
            });
        },
        getAlarmInfo: function() {
            var me = this;
            common.layUI({
                title: 'Alarm Info',
                area: ['1000px', '500px'],
                btn: [],
                content: template.compile(tpls.alarm)(),
                success: function(el) {
                    var orgNo = common.getCookie('orgno');
                    // 获取车牌
                    common.getPlateNum(orgNo);
                    // 获取警情
                    common.getAlarmTypeList();
                    // 获取数据
                    me.getAlarmData();
                    // event
                    $(el)
                        .on('click', '.js_alarm_search', function() {
                            var param = {
                                AlarmCode: $('#selAlarm').val(),
                                PlateNo: $('#selPlateNumber').val()
                            }
                            me.getAlarmData(param);
                        })
                        .on('click', '.js_alarm_reset', function() {
                            $('#selAlarm,#selPlateNumber').val('').next().find(':text').val('').end()
                                .find('dd').removeClass('layui-this');
                            me.getAlarmData();
                        })
                        // 全部处理
                        .on('click', '.js_alarm_allDispose', function() {})
                        // 单个处理
                        .on('click', '.js_alarm_dispose', function() {
                            var id = $(this).closest('tr').attr('data-id');
                            me.processAlarm(id);
                        });
                }
            });
        },
        event: function() {
            var me = this;
            // 事件监听
            $('#main-content').off()
                // 组织列表隐藏
                .on('click', '.vehicle-close', function() {
                    $('.vehicle-box').hide();
                })
                // 切换组织列表
                .on('click', '.js-origin', function() {
                    $('.vehicle-box').toggle();
                    $('.js-foldToggle').removeClass('foldDown').addClass('foldUp');
                    $('.monitorBody').hide();
                })
                // 切换OBD
                .on('click', '.js-toggleOBD', function() {
                    $('#obdList').toggleClass('hidden');
                })
                // 报警
                .on('click', '.js-mapAlarm', function() {
                    me.getAlarmInfo();
                })
                // 隐藏OBD
                .on('click', '.odb-close', function() {
                    $('#obdList').addClass('hidden');
                })
                // 切换obd信息
                .on('click', '.ul-tab > li', function() {
                    $(this).addClass('active').siblings().removeClass('active');
                    var target = $(this).attr('data-target');
                    $('#' + target).removeClass('hidden').siblings().addClass('hidden');
                })
                // 切换车辆列表
                .on('click', '.js-foldToggle', function() {
                    var order = '';
                    if ($(this).hasClass('foldUp')) {
                        $(this).removeClass('foldUp').addClass('foldDown');
                        order = 'up';
                    } else {
                        $(this).removeClass('foldDown').addClass('foldUp');
                        order = 'down';
                    }
                    $('.vehicle-box').hide();
                    $('.monitorBody').toggle();
                })
                // 车辆详情
                .on('click', '.js_car_info', function() {
                    var id = $(this).data('id');
                    me.carDetailInfo(id);
                })
                // 地图查询车辆
                .on('click', '.js-search-car', function() {
                    var plateNo = $.trim($('input[name="txtCarPlateNo"]').val());
                    var list = $('#carMonitorList').find('tr[plateno*="' + plateNo + '"]');
                    if (list.size() > 0) {
                        var defRow = $(list).eq(0);
                        if ($('.monitorBody').is(':hidden')) {
                            $('.js-foldToggle').click();
                        }
                        $(defRow).addClass('monitor-active').siblings().removeClass('monitor-active');
                        $('#carMonitorList').scrollTop($(defRow).index() * 41);
                        $(defRow).click();
                    }
                })
                // 指令
                .on('click', '.js_directive', function() {
                    var vid = $(this).data('id');
                    me.getDirectiveInfo(vid);
                })
                // 轨迹回放
                .on('click', '.js_track_replay', function() {
                    var id = $(this).data('id');
                    var plateNo = $(this).data('plate');
                    common.stopMonitorTimer();
                    common.changeHash('#carMonitor/track/', { id: id, plateNo: plateNo });
                })
                // 已选组织-确认
                .on('click', '.js-vehicle-ok', function() {
                    $('.vehicle-box').hide();
                    $('.js-foldToggle').removeClass('foldUp').addClass('foldDown');
                    $('.monitorBody').show();
                    common.stopMonitorTimer();
                    me.getCarPositionList(null, true);
                });
        }
    });

    var monitor = new carMonitor();

    exports.init = function(param) {
        monitor.init(param);
    };

    // 地图infowindow事件
    //地图信息框点击事件-车辆详细信息
    window.showVehicleInfo = function(id) {
        monitor.carDetailInfo(id);
    };
    //地图信息框点击事件-车辆轨迹
    window.showVehicleTrack = function(id, plateNo) {
        common.stopMonitorTimer();
        common.changeHash('#carMonitor/track/', { id: id, plateNo: plateNo });
    };
});