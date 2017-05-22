define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');

    require('lodash');
    require('zTree');
    require('excheck');
    require('exhide');
    // 模板
    var tpls = {
        index: require('../../tpl/sendCode/index'),
    };

    function sendCode() {}
    $.extend(sendCode.prototype, {
        init: function(param) {
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.index)());
            // 获取车辆数据
            this.initTree();
            // 事件绑定
            this.event();
        },
        getSelectTreeValue: function() {
            return common.getTreeNodeSelected('vehicleTree');
        },
        sendCodeByVids: function(param) {
            param = param || {};
            common.loading('show');
            common.ajax(api.sendCode, param, function(res) {
                if (res && res.status === 'SUCCESS') {
                    common.layMsg('SUCCESS!');
                } else {
                    var msg = res.errorMsg || 'System error, please contact the administrator!';
                    common.layMsg(msg);
                }
                common.loading();
            });
        },
        event: function() {
            var me = this;
            // 事件监听
            $('#main-content').off().on('click', '.js-setInterval', function() {
                var interval = $.trim($('input[name="txtInterval"]').val());
                var vids = me.getSelectTreeValue();
                if (vids.length) {
                    if (interval && /^\d*$/.test(interval) && interval >= 2 && interval <= 3000) {
                        var param = {
                            Vids: vids,
                            Cmd: '1013',
                            Args: interval
                        };
                        me.sendCodeByVids(param);
                    } else {
                        common.layAlert('Can not be empty and can only enter integers (2-3000) or less!');
                    }
                } else {
                    common.layAlert('Please select the vehicle that needs to send the command!');
                }
            }).on('click', '.js-setMessage', function() {
                var message = $.trim($('textarea[name="txtMessage"]').val());
                var vids = me.getSelectTreeValue();
                if (vids.length) {
                    if (message && message.length > 0 && message.length <= 50) {
                        var param = {
                            Vids: vids,
                            Cmd: '1014',
                            Args: message
                        };
                        me.sendCodeByVids(param);
                    } else {
                        common.layAlert('Can not be empty, and the length must be within 50 characters!');
                    }
                } else {
                    common.layAlert('Please select the vehicle that needs to send the command!');
                }
            });
        },
        //初始化树
        initTree: function(callback) {
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
            common.loading('show');
            common.ajax(api.vehicleList, {}, function(res) {
                if (res && res.status === 'SUCCESS') {
                    var data = res.content || [];
                    $.fn.zTree.init($('#vehicleTree'), ztreeSetting, data);
                    var treeObj = $.fn.zTree.getZTreeObj("vehicleTree");
                    treeObj.expandAll(true);
                } else {
                    var msg = res.errorMsg || 'System error, please contact the administrator!';
                    common.layMsg(msg);
                }
                common.loading();
            });
        }
    });

    exports.init = function(param) {
        new sendCode().init(param);
    };
});