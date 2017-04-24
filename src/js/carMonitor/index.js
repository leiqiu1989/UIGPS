define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    require('zTree');
    require('excheck');
    require('exhide');
    var map = require('map');
    // 模板
    var tpls = {
        index: require('../../tpl/carMonitor/index'),
        carList: require('../../tpl/carMonitor/list'),
        carDetail: require('../../tpl/carMonitor/carDetail'),
        directive: require('../../tpl/carMonitor/directive'),
        odbInfo: require('../../tpl/carMonitor/odb')
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
            map.init('monitorMap', null, true);
            map.addDrawing(function(param) {
                me.getDrawData(param);
            });
            this.initControl();
        },
        // 初始化控件
        initControl: function() {
            this.event();
            this.initZTree();
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
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
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
                map.addTrackMark(data[i]);
            }
            // 绑定监控表格行单击事件
            map.bindMonitorListEvent(this.getOBDInfo);
            // 统计
            me.monitorSummary(data);
            if (data.length > 0 && monitorStart) {
                // 开启监控
                me.startMonitorTimer();
            }
            // 获取OBD信息
            if (data && data.length > 0) {
                this.getOBDInfo(data[0].Vid);
            }
        },
        getOBDInfo: function(vid) {
            common.ajax(api.odbInfo, { vid: vid }, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var data = res.content || [];
                    $('.obd-Content').empty().html(template.compile(tpls.odbInfo)({
                        data: data
                    }));
                    common.translatorLang();
                    $('#obdList').removeClass('hidden');
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.layMsg(msg);
                }
            });
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
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
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
                if (item.VehicleStatus === '离线') {
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
                        title: '车辆详情',
                        area: '700px',
                        content: html
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.layMsg(msg);
                }
            });
        },
        // 获取车辆位置列表
        getCarPositionList: function(arrVids, isloading) {
            var loadStatus = isloading ? 'show' : 'hide';
            var me = this;
            var arrVid = arrVids ? arrVids : common.getTreeNodeSelected('vehicleTree');
            common.setlocationStorage('arrVids', arrVid);
            if (arrVid) {
                common.loading(loadStatus);
                common.ajax(api.carPositionList, { ArrVid: arrVid }, function(res) {
                    if (res && res.status === 'SUCCESS') {
                        var data = res.content || [];
                        me.initCarMonitorList(data, true);
                    } else {
                        var msg = res.errorMsg || '系统出错，请联系管理员！';
                        common.layMsg(msg);
                    }
                    common.loading();
                });
            }
        },
        // 发动指令
        sendCode: function(param, callback) {
            param = param || {};
            common.loading('show');
            common.ajax(api.sendCode, param, function(res) {
                if (res && res.status === 'SUCCESS') {
                    if (callback) callback();
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.layAlert(msg, { icon: 2 });
                }
                common.loading();
            });
        },
        event: function() {
            var me = this;
            // 事件监听
            $('#main-content')
                // 组织列表隐藏
                .on('click', '.vehicle-close', function() {
                    $('.vehicle-box').hide();
                })
                // 切换组织列表
                .on('click', '.js-origin', function() {
                    $('.vehicle-box').toggle();
                    $('.js-foldToggle').removeClass('foldDown').addClass('foldUp');
                    map.moveOverView('down');
                    $('.monitorBody').hide();
                })
                // 切换OBD
                .on('click', '.js-toggleOBD', function() {
                    $('#obdList').toggleClass('hidden');
                })
                // 隐藏OBD
                .on('click', '.odb-close', function() {
                    $('#obdList').addClass('hidden');
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
                    map.moveOverView(order);
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
                    var param = {
                        Vids: vid,
                    };
                    common.layUI({
                        title: '指 令',
                        area: '700px',
                        id: 'directForm',
                        btn: [],
                        content: tpls.directive,
                        success: function(el) {
                            $(el).find('.js-setInterval').on('click', function() {
                                var interval = $.trim($('input[name="txtInterval"]').val());
                                if (interval && /^\d*$/.test(interval) && interval >= 2 && interval <= 3000) {
                                    param.Cmd = '1013';
                                    param.Args = interval;
                                    me.sendCode(param, function() {
                                        layer.closeAll();
                                    });
                                } else {
                                    common.layAlert('不能为空且只能输入整数（2-3000）以内的整数!');
                                }
                            });
                            // 短消息
                            $(el).find('.js-setMessage').on('click', function() {
                                var message = $.trim($('textarea[name="txtMessage"]').val());
                                if (message && message.length > 0 && message.length <= 50) {
                                    param.Cmd = '1014';
                                    param.Args = message;
                                    me.sendCode(param, function() {
                                        layer.closeAll();
                                    });
                                } else {
                                    common.layAlert('不能为空，且长度必须在50个字符以内!');
                                }
                            });
                        }
                    });
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
                    map.moveOverView('up');
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