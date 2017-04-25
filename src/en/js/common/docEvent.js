define(function(require, exports, module) {
    'use strict';
    // 引入模块
    var validate = require('validate');
    var common = require('common');
    var api = require('api');

    var tpls = {
        changpwd: require('../../tpl/index/changepwd')
    };

    function docEvent() {}
    $.extend(docEvent.prototype, {
        init: function() {
            // 全局监听document事件
            $(document).on('click', function(e) {
                var target = $(e.target);
                if (target.closest('ul.ul-select').size() < 1) {
                    $('ul.ul-select').addClass('hidden');
                }
            }).on('click', '.js_logout', function() {
                common.clearData();
                window.location.hash = "#login/login";
            }).on('click', '.js_changpwd', function() {
                common.autoAdaptionDialog(tpls.changpwd, {
                    title: '修改密码'
                }, function(_dialog) {
                    $('input[name="oldpwd"]').focus();
                    $('#btnCancel').on('click', function() {
                        _dialog.close();
                    });
                    validate('#frmChangePwd', {
                        subBtn: '#btnOK',
                        promptPos: 'inline',
                        submit: function() {
                            var oldpwd = $.trim($('#frmChangePwd input[name="oldpwd"]').val());
                            var newpwd = $.trim($('#frmChangePwd input[name="newpwd"]').val());
                            common.ajax(api.modifypwd, { oldpwd: oldpwd, newpwd: newpwd }, function(res) {
                                if (res && res.status == 'SUCCESS') {
                                    common.layMsg('数据操作成功!');
                                    common.clearData();
                                    common.changeHash('#login/login');
                                } else {
                                    common.layMsg(res.errorMsg || '密码修改失败!');
                                }
                            });
                            _dialog.close();
                        },
                        reg: {
                            'letternum': /^[0-9a-zA-Z]{8,16}$/
                        },
                        errorMsg: {
                            'letternum': '只能输入字母和数字(长度8-16)'
                        }
                    });
                });
            });
        }
    });
    exports.init = function() {
        new docEvent().init();
    };
});