define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var common = require('common');
    var api = require('api');
    var validate = require('validate');

    // 模板
    var tpls = {
        add: require('../../tpl/organizetionManager/add')
    };

    var orgAdd = function() {
        this.isEdit = false;
        this.orgId = null;
    };

    $.extend(orgAdd.prototype, {
        init: function(id) {
            this.isEdit = !!id;
            this.orgId = id || null;
            this.initPage();
        },
        renderHtml: function(data) {
            var me = this;
            var title = data ? 'Edit' : 'Add';
            data = data || {};
            data.Users = data.Users || [];
            $('#main-content').empty().html(template.compile(tpls.add)({ title: title, data: data, isEdit: this.isEdit }));
            this.validate();
            this.event();
            common.subordinateTree({
                orgNo: data.OrgNo, // 机构编号
                loadDevice: false,
                loadPlateNum: false,
                loadSIM: false,
                timeType: null
            });
            common.layUIForm();
        },
        initPage: function() {
            var me = this;
            // 编辑
            if (this.isEdit) {
                common.loading('show');
                common.ajax(api.orgManager.detail, {
                    OrgId: me.orgId
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
        validate: function() {
            var me = this;
            validate('#frmOrgUser', {
                subBtn: '.js_save',
                promptPos: 'inline',
                submit: function() {
                    me.submitForm();
                }
            });
        },
        submitForm: function() {
            var me = this;
            var params = common.getFormData('#frmOrgInfo');
            params.ParentOrgNo = $('#txtSubordinate').data('orgNo') || '';
            var url = this.isEdit ? api.orgManager.update : api.orgManager.save;
            if (this.isEdit) {
                params.OrgId = this.orgId;
            }
            common.ajax(url, params, function(res) {
                if (res && res.status === 'SUCCESS') {
                    common.layMsg('SUCCESS!', 'success');
                    common.changeHash('#organizetionManager/index/', { back: true });
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
                common.changeHash('#organizetionManager/index/', { back: true });
            });
        }
    });

    exports.init = function(param) {
        new orgAdd().init(param.id);
    };
});