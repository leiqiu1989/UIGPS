define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var validate = require('validate');
    var common = require('common');
    var api = require('api');

    // 模板
    var tpls = {
        index: require('../../tpl/complaintManager/list'),
        list: require('../../tpl/complaintManager/table')
    };

    var complaintList = function() {

    };
    $.extend(complaintList.prototype, {
        init: function(param) {
            // 获取查询条件
            this.getParams(param);
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.index)({ searchValue: this.searchParam }));
            // 控件初始化
            this.initControl();
            // 获取数据
            this.getData();
        },
        // 获取查询条件
        getParams: function(param) {
            this.sortParam = {};
            var newParams = {
                OrderNum: common.getElValue('input[name="orgId"]'),
                From: common.getElValue('input[name="From"]'),
                To: common.getElValue('input[name="To"]'),
                Feature: common.getElValue('select[name="Feature"] > option:selected'),
                Start: common.getElValue('input[name="Start"]'),
                End: common.getElValue('input[name="End"]')
            };
            this.searchParam = common.getParams('complaintManagerParams', param, newParams);
            if (!this.searchParam.Start) this.searchParam.Start = new Date().format('yyyy-MM-dd 00:00');
            if (!this.searchParam.End) this.searchParam.End = new Date().format('yyyy-MM-dd h:m');
        },
        initControl: function() {
            common.initDateTime('input[name="Start"]', null, false, 'yyyy-MM-dd 00:00');
            common.initDateTime('input[name="End"]', null, false);
            // 默认选中
            $('select[name="Feature"]').val(this.searchParam.Feature || 0);
            this.event();
        },
        event: function() {
            var me = this;
            /*************顶部工具栏*********/
            $('.panel-toolbar').off()
                //查询
                .on('click', '.js_search', function() {
                    me.getParams(true);
                    common.changeHash('#complaintManager/index/', me.searchParam);
                })
                //重置
                .on('click', '.js_list_reset', function() {
                    common.removeLocationStorage('complaintManagerParams'); // 投诉管理
                    me.getParams(false);
                    common.changeHash('#complaintManager/index/', me.searchParam);
                })
                //导出
                .on('click', '.js_export', function() {
                    //me.export($(this));
                });
        },
        getData: function() {
            var me = this;
            var param = $.extend({}, this.searchParam, this.sortParam ? this.sortParam : {});
            // 将查询条件保存到localStorage里面
            common.setlocationStorage('complaintManagerParams', JSON.stringify(this.searchParam));
            common.loading('show');
            common.ajax(api.complaintManager.list, param, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    $('#complaintList').empty().html(template.compile(tpls.list)({
                        data: data.Page || []
                    }));
                    me.totalCount = data.totalCount;
                    common.page(data.TotalCount, param.PageSize, param.PageIndex, function(currPage) {
                        me.searchParam.PageIndex = currPage;
                        common.changeHash('#complaintManager/index/', me.searchParam);
                    });
                } else {
                    var msg = res.errorMsg || '系统出错，请联系管理员！';
                    common.toast(msg);
                }
                common.loading();
            });
        },
        export: function(el) {
            if (this.totalCount <= 1000) {
                this.getParams();
                var st = common.getCookie('st');
                var sid = common.getCookie('sid');
                var src = api.gpsDevice.export+'?sid=' + sid + '&st=' + st;
                $.each(this.searchParam, function(key, value) {
                    src += '&' + key + '=' + value;
                });
                var downSrc = encodeURI(src);
                $(el).attr('href', downSrc);
            } else {
                common.toast('导出数据量过大,请输入查询条件查询,最多导出1000条数据!');
                return false;
            }
        }
    });

    exports.init = function(param) {
        new complaintList().init(param);
    };
});