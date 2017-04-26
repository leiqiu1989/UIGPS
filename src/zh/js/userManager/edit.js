define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    var validate = require('validate');

    // 模板
    var tpls = {
        add: require('../../tpl/userManager/add'),
        userinfo: require('../../tpl/userManager/userInfo')
    };

    var userAdd = function() {
        this.isEdit = false;
        this.orgId = null;
        this.roles = null;
    };

    $.extend(userAdd.prototype, {
        init: function(id) {
            this.isEdit = !!id;
            this.orgId = id || null;
            this.initPage();
        },
        renderHtml: function(data) {
            var me = this;
            var title = data ? '编辑组织用户' : '新增组织用户';
            data = data || {};
            data.Users = data.Users || [];
            $('#main-content').empty().html(template.compile(tpls.add)({ title: title, data: data, isEdit: this.isEdit }));
            this.initSelect($('select[name="RoleId"]'), function() {
                common.layUIForm();
                if (me.isEdit) {
                    var rows = $('#frmUserList > div.row');
                    $.each(rows, function(i, row) {
                        $(row).find('select[name="RoleId"]').val(data.Users[i].RoleId);
                    });
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
                    OrgId: me.orgId
                }, function(res) {
                    if (res.status === 'SUCCESS') {
                        var data = res.content;
                        me.renderHtml(data);
                    } else {
                        var msg = res.errorMsg ? res.errorMsg : '服务器问题，请稍后重试';
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
                errorMsg: opt.errorMsg || '请求错误，未请求到数据',
                key: opt.key || ['id', 'name'],
                $objs: opt.obj
            };
            common.ajax(obj.url, obj.params, function(res) {
                if (res.status === 'SUCCESS') {
                    var data = res.content;
                    me.roles = data;
                    var html = '';
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
            validate('#frmOrgUser', {
                subBtn: '.js_add_save',
                promptPos: 'inline',
                submit: function() {
                    me.submitForm();
                },
                reg: {
                    'pwd': /^[a-zA-Z0-9]{8,16}$/
                },
                errorMsg: {
                    'pwd': '密码为字母和数字,长度(8-16)'
                }
            });
        },
        submitForm: function() {
            var me = this;
            var users = [];
            var params = common.getFormData('#frmOrgInfo');
            var rows = $('#frmUserList > div.row:not(:last)');
            for (var i = 0; i < rows.size(); i++) {
                var el = rows[i];
                var user = common.getFormData(el);
                users.push(user);
            }
            params.Users = users;
            var url = this.isEdit ? api.userManager.update : api.userManager.save;
            common.ajax(url, { OrgUser: JSON.stringify(params) }, function(res) {
                if (res && res.status === 'SUCCESS') {
                    common.layMsg('数据操作成功!', 'success');
                    common.changeHash('#userManager/index');
                } else {
                    var msg = res.errorMsg ? res.errorMsg : '服务器问题，请稍后重试';
                    common.layAlert(msg);
                }
            });
        },
        event: function() {
            var me = this;
            // 所属机构事件监听
            common.listenOrganization(function(orgId, orgName) {
                $(':hidden[name="ParentOrgNo"]').val(orgId);
                $('input[type="ParentOrgName"]').val(orgName);
            });
            // 事件监听
            $('#main-content').on('click', '.js_add_back', function() {
                    common.changeHash('#userManager/index');
                })
                // 新增用户
                .on('click', '.js-addUser', function() {
                    if ($('#frmUserList div.row:not(.operator-row)').size() < 5) {
                        if ($('#frmUserList div.row:not(.operator-row)').size() < 1) {
                            $('#frmUserList div.row').before(template.compile(tpls.userinfo)({ roles: me.roles }));
                        } else {
                            $('#frmUserList div.row:first').after(template.compile(tpls.userinfo)({ roles: me.roles }));
                        }
                        common.layUIForm();
                    } else {
                        common.layMsg('It can bound 5 users at most!');
                        return false;
                    }
                })
                // 删除用户
                .on('click', '.js_delete', function() {
                    var row = $(this).closest('div.row');
                    row.remove();
                });
        }
    });

    exports.init = function(param) {
        new userAdd().init(param.id);
    };
});