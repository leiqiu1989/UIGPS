define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    require('lodash');
    // 模板
    var tpls = {
        index: require('../../tpl/geofenceManager/index'),
        list: require('../../tpl/geofenceManager/list')
    };

    function geofenceManager() {}
    $.extend(geofenceManager.prototype, {
        init: function(param) {
            // 初始化查询条件参数
            this.getParams(param);
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.index)({ searchValue: this.searchParam }));

            this.initControl();

            this.event();
            // 获取数据
            this.getData();
        },
        initControl: function() {
            var me = this;
            common.subordinateTree({
                loadSIM: false, //不加载sim
                loadDevice: false, //不加载设备编号
                orgNo: me.searchParam.Subordinate, // 机构编号
                PlateNo: me.searchParam.PlateNo //车牌号码
            });
            // status
            $('#selStatus').val(me.searchParam.Status);
            var txtStatus = $('#selStatus > option:selected').text();
            $('#selStatus').next().find(':text').val(txtStatus).end()
                .find('dd[lay-value=' + me.searchParam.Status + ']').addClass('layui-this').siblings().removeClass('layui-this');
            common.layUIForm();
        },
        getData: function() {
            var me = this;
            var param = this.searchParam;
            param = $.extend({}, param, this.sortParam ? this.sortParam : {});
            common.loading('show');
            common.ajax(api.areaManager.list, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var content = res.content || {};
                    var total = content.TotalCount || 0;
                    var data = content.Page || [];
                    $('#geofenceManagerList > table > tbody').empty().html(template.compile(tpls.list)({
                        data: data
                    }));
                    common.page(total, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.PageIndex = currPage;
                        common.changeHash('#geofenceManager/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统错误，请联系管理员!';
                    common.layMsg(msg);
                    return false;
                }
                common.loading();
            });
        },
        // 获取查询条件
        getParams: function(param, reset) {
            param = param || {};
            reset = reset || false;
            this.sortParam = {};
            var _param = null;
            if (reset) {
                _param = {
                    SubordinateName: '',
                    Subordinate: '',
                    PlateNo: '',
                    AreaName: '',
                    Status: -1 //全部
                }
            } else {
                if (param && _.isEmpty(param)) {
                    _param = {
                        SubordinateName: common.getElValue('#txtSubordinate'),
                        Subordinate: $('#txtSubordinate').data('orgNo') || '',
                        PlateNo: common.getElValue('#selPlateNumber'),
                        AreaName: common.getElValue('#AreaName'),
                        Status: common.getElValue('#selStatus') || -1
                    }
                } else {
                    _param = param;
                }
            }
            this.searchParam = common.getParams(null, true, _param);
        },
        exportList: function(el) {
            common.layMsg('No Implementation');
            // var accountId = common.getCookie('accountid');
            // var userType = common.getCookie('usertype');
            // var orgNo = common.getCookie('orgno');
            // var token = common.getCookie('token');
            // var src = api.serverDueManager.export+'?AccountId=' + accountId + '&UserType=' + userType + '&OrgNo=' + orgNo + '&Token=' + token;
            // $.each(this.searchParam, function(key, value) {
            //     src += '&' + key + '=' + value;
            // });
            // var downSrc = encodeURI(src);
            // $(el).attr('href', downSrc);
        },
        event: function() {
            var me = this;
            // 查询-事件监听
            $('.panel-toolbar').on('click', '.js_list_search', function(event) {
                me.getParams();
                common.changeHash('#geofenceManager/index/', me.searchParam);
            }).on('click', '.js_list_reset', function() {
                me.getParams(null, true);
                common.changeHash('#geofenceManager/index/', me.searchParam);
            });
            // 事件监听
            $('#main-content').off()
                // 导出
                .on('click', '.js_list_export', function() {
                    me.exportList($(this));
                })
                // 更改状态
                .on('click', '.js_list_changeStatus', function() {
                    var keyId = $(this).closest('tr').attr('data-id');
                    var enabled = $(this).attr('data-status');
                    me.changeStatus(keyId, enabled);
                })
                // 删除
                .on('click', '.js_list_delete', function() {
                    var keyId = $(this).closest('tr').attr('data-id');
                    common.layConfirm('确认删除?', function() {
                        me.deleteItem(keyId);
                    });
                })
                // 新增
                .on('click', '.js_list_add', function() {
                    common.changeHash('#geofenceManager/add');
                })
                // 编辑
                .on('click', '.js_list_edit', function() {
                    var keyId = $(this).closest('tr').attr('data-id');
                    common.changeHash('#geofenceManager/add/', { id: keyId });
                });
        },
        changeStatus: function(keyId, enabled) {
            var me = this;
            common.loading('show');
            common.ajax(api.areaManager.enable, { KeyId: keyId, Enable: enabled }, function(res) {
                if (res.status === 'SUCCESS') {
                    me.getData();
                    common.layMsg('操作成功!');
                } else {
                    var msg = res.errorMsg || '系统错误，请联系管理员!';
                    common.layMsg(msg);
                    return false;
                }
                common.loading();
            });
        },
        deleteItem: function(keyId) {
            var me = this;
            common.loading('show');
            common.ajax(api.areaManager.del, { KeyId: keyId }, function(res) {
                if (res.status === 'SUCCESS') {
                    me.getData();
                    common.layMsg('操作成功!');
                } else {
                    var msg = res.errorMsg || '系统错误，请联系管理员!';
                    common.layMsg(msg);
                    return false;
                }
                common.loading();
            });
        }
    });

    var _geofenceManager = new geofenceManager();

    exports.init = function(param) {
        _geofenceManager.init(param);
    };
});