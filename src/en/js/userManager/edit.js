define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    var validate = require('validate');

    // 模板
    var tpls = {
        add: require('../../tpl/userManager/add')
    };

    var userAdd = function() {
        this.isEdit = false;
        this.uid = null;
    };

    $.extend(userAdd.prototype, {
        init: function(id) {
            this.isEdit = !!id;
            this.uid = id || null;
            this.initPage();
        },
        renderHtml: function(data) {
            var me = this;
            var title = data ? 'Edit' : 'Add';
            data = data || {};
            $('#main-content').empty().html(template.compile(tpls.add)({ title: title, data: data }));
            this.initSelect($('select[name="RoleId"]'), function() {
                common.subordinateTree({
                    orgNo: data.OrgNo, // 机构编号
                    loadDevice: false,
                    loadPlateNum: false,
                    loadSIM: false,
                    timeType: null
                });
                common.layUIForm();
                if (me.isEdit) {
                    $('select[name="RoleId"]').val(data.RoleId).next().find(':text')
                        .val(data.RoleId).end().find('dd[lay-value=' + data.RoleId + ']')
                        .addClass('layui-this');
                }
            });
            this.validate();
            this.event();
        },
        initPage: function() {
            var me = this;
            // 编辑
            if (this.isEdit) {
                common.loading('show');
                common.ajax(api.userManager.detail, {
                    userId: me.uid
                }, function(res) {
                    if (res.status === 'SUCCESS') {
                        var data = res.content;
                        me.renderHtml(data);
                    } else {
                        var msg = res.errorMsg ? res.errorMsg : 'Server problem, please try again later';
                        common.layAlert(msg, 'error');
                    }
                    common.loading();
                });
            } else {
                this.renderHtml();
            }
        },
        initSelect: function(el, callback) {
            //获取角色列表
            this.getSelect({
                url: api.userManager.roles,
                obj: el,
                key: ['RoleId', 'RoleName']
            }, callback);
        },
        getSelect: function(opt, callback) {
            var me = this;
            var obj = {
                url: opt.url,
                params: opt.params || {},
                errorMsg: opt.errorMsg || 'Request error, no data requested',
                key: opt.key || ['id', 'name'],
                $objs: opt.obj
            };
            common.ajax(obj.url, obj.params, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    var html = '<option value="">Select</option>';
                    if (data && data.length > 0) {
                        $.each(data, function(i, item) {
                            html += '<option value="' + item[obj.key[0]] + '">' + item[obj.key[1]] + '</option>';
                        });
                    }
                    obj.$objs.html(html);
                    if (callback) callback();
                } else {
                    var msg = res.errorMsg || obj.errorMsg;
                    common.layMsg(msg);
                }
            });
        },
        validate: function() {
            var me = this;
            validate('#frmUser', {
                subBtn: '.js_save',
                promptPos: 'inline',
                submit: function() {
                    me.submitForm();
                }
            });
        },
        submitForm: function() {
            var me = this;
            var users = [];
            var params = common.getFormData('#frmUser');
            if (this.isEdit) {
                params.Uid = this.uid;
            }
            params.OnlyOrgNo = $('#txtSubordinate').data('orgNo') || '';
            var url = this.isEdit ? api.userManager.update : api.userManager.save;
            common.ajax(url, params, function(res) {
                if (res && res.status === 'SUCCESS') {
                    common.layMsg('SUCCESS!', 'success');
                    common.changeHash('#userManager/index');
                } else {
                    var msg = res.errorMsg ? res.errorMsg : 'Server problem, please try again later';
                    common.layAlert(msg);
                }
            });
        },
        event: function() {
            var me = this;
            // 事件监听
            $('#main-content').on('click', '.js_cancel', function() {
                common.changeHash('#userManager/index/', { back: true });
            });
        }
    });

    exports.init = function(param) {
        new userAdd().init(param.id);
    };
});