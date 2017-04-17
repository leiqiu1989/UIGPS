define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    // 模板
    var tpls = {
        carIndex: require('../../tpl/carOrderConfig/index'),
        carList: require('../../tpl/carOrderConfig/list'),
        configDialog: require('../../tpl/carOrderConfig/configDialog')
    };

    function carOrderConfigList() {}
    $.extend(carOrderConfigList.prototype, {
        init: function(param) {
            // 初始化查询条件参数
            this.getParams(param);
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.carIndex)({ searchValue: this.searchParam }));
            // 控件初始化
            this.initControl();
            // 获取数据
            this.getData();
        },
        // 初始化控件
        initControl: function() {
            var me = this;
            this.event();

            var weekArray = [];
            common.initSelect('select[name="acceptOrder"]', {}, function(param) {
                var oldVal = $(':hidden[name="hi_acceptOrder"]').val();
                if (oldVal) {
                    weekArray = oldVal.split('|');
                }
                if (param.selected) {
                    weekArray.push(param.selected);
                } else if (param.deselected) {
                    weekArray = _.without(weekArray, param.deselected);
                }
                $(':hidden[name="hi_acceptOrder"]').val(weekArray.join('|'));
            }, this.searchParam.acceptOrderStr, { width: '350px' });
            common.initDateTime('input[name="StartTime"]', 'Y-m-d H:i', false, 'yyyy-MM-dd h:m', true, false);
            common.initDateTime('input[name="EndTime"]', 'Y-m-d H:i', false, 'yyyy-MM-dd h:m', true, false);
        },
        // 获取查询条件
        getParams: function(param) {
            this.sortParam = {};
            var acceptOrderStr = common.getElValue(':hidden[name="hi_acceptOrder"]'),
                arr = acceptOrderStr.split('|');

            var newParams = {
                PlateNo: common.getElValue('input[name="PlateNo"]'),
                StartTime: common.getElValue('input[name="StartTime"]'),
                EndTime: common.getElValue('input[name="EndTime"]'),
                WxFlag: _.indexOf(arr, 'WxFlag') == -1 ? 0 : 1,
                PositionFlag: _.indexOf(arr, 'PositionFlag') == -1 ? 0 : 1,
                VoiceFlag: _.indexOf(arr, 'VoiceFlag') == -1 ? 0 : 1,
                ControlFlag: _.indexOf(arr, 'ControlFlag') == -1 ? 0 : 1,
                acceptOrderStr: acceptOrderStr
            };
            if (param == false) {
                newParams = {};
            }
            this.searchParam = common.getParams('carOrderConfigParams', param, newParams, true);
        },
        getData: function() {
            var me = this;
            var param = this.searchParam;
            param = $.extend({}, param, this.sortParam ? this.sortParam : {});
            // 将查询条件保存到localStorage里面
            common.setlocationStorage('carOrderConfigParams', JSON.stringify(this.searchParam));
            common.loading('show');
            common.ajax(api.carOrderConfig.list, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    $('#carList').empty().html(template.compile(tpls.carList)({
                        data: data.Page || []
                    }));
                    common.page(data.TotalCount, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.PageIndex = currPage;
                        common.changeHash('#carOrderConfig/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
                common.loading();
            });
        },
        exportCarList: function(el) {
            this.getParams();
            var st = common.getCookie('st');
            var sid = common.getCookie('sid');
            var src = api.carManager.exportCarList + '?sid=' + sid + '&st=' + st;
            $.each(this.searchParam, function(key, value) {
                src += '&' + key + '=' + value;
            });
            var downSrc = encodeURI(src);
            $(el).attr('href', downSrc);
        },
        event: function() {
            var me = this;
            // 所属机构事件监听
            common.listenOrganization();
            // 查询-事件监听
            $('.panel-toolbar')
                //重置
                .on('click', '.js_list_reset', function() {
                    common.removeLocationStorage('carOrderConfigParams'); // 车辆管理
                    me.getParams(false);
                    common.changeHash('#carOrderConfig/index/', me.searchParam);
                })
                .on('click', '.js_list_search', function() {
                    me.getParams(true);
                    common.changeHash('#carOrderConfig/index/', me.searchParam);
                });
            // 事件监听
            $('#main-content').off()
                //配置
                .on('click', '.js_list_config', function() {
                    var tr = $(this).closest('tr');
                    var id = tr.data('vid');
                    var plateno = tr.data('plateno');

                    me.initCarOrderConfig(id, plateno);
                })
                .on('click', '.js_list_export', function() {
                    me.exportCarList($(this));
                });
        },
        setCarOrderConfig: function(id, plateno, content) {
            var me = this;

            common.autoAdaptionDialog(template.compile(tpls.configDialog)({ data: content || {} }), {
                title: plateno
            }, function(_dialog) {
                var $dialogContainer = $('#js_configDialog_form');

                $dialogContainer.off()

                .on('click', '#btnCancel', function() {
                        _dialog.close();
                    })
                    .on('click', '#btnOK', function() {
                        common.ajax(api.carOrderConfig.editVehicleOrder, {
                            vid: id,
                            plateNo: plateno, //车牌号码
                            WxFlag: $dialogContainer.find('input[name="WxFlag"]').is(':checked') ? 1 : 0, //微信订单
                            PositionFlag: $dialogContainer.find('input[name="PositionFlag"]').is(':checked') ? 1 : 0, //位置订单
                            VoiceFlag: $dialogContainer.find('input[name="VoiceFlag"]').is(':checked') ? 1 : 0, //语音订单
                            ControlFlag: $dialogContainer.find('input[name="ControlFlag"]').is(':checked') ? 1 : 0, //调度屏信息
                            SettingRemark: $.trim($dialogContainer.find('#_remark').val()) //备注
                        }, function(res) {
                            if (res.status === 'SUCCESS') {
                                _dialog.close();
                                common.toast('配置成功', 'success');
                                // 获取数据
                                me.getData();
                            } else {
                                var msg = res.errorMsg || '请求失败，请联系管理员！';
                                common.toast(msg);
                            }
                        });
                    });
            });
        },
        //初始化数据
        initCarOrderConfig: function(id, plateno) {
            var me = this;

            common.ajax(api.carOrderConfig.queryVehicelOrder, { vid: id }, function(res) {
                if (res.status === 'SUCCESS') {
                    var content = res.content;
                    me.setCarOrderConfig(id, plateno, content);
                } else {
                    var msg = res.errorMsg || '请求失败，请联系管理员！';
                    common.toast(msg);
                }
            });
        }
    });

    exports.init = function(param) {
        new carOrderConfigList().init(param);
    };
});