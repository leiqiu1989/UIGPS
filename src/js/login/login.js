define(function(require, exports, module) {
    var common = require('common');
    var api = require('api');
    var tpl = require('./../../tpl/login/login');

    function login() {}

    $.extend(login.prototype, {
        init: function() {
            $('body').addClass('logn-bg');
            $('#admin').empty().html(template.compile(tpl)());
            $('input[name="username"]').focus();
            this.setloginData();
            this.event();
        },
        event: function() {
            var me = this;
            $('input[name="password"]').on('keyup', function(event) {
                var keycode = event.keyCode || event.which;
                if (keycode == 13) {
                    me.submit();
                }
            }).on('keyup', 'input[name="username"]', function() {
                $('input[name="password"]').val('');
            });
            //记住密码
            $('#js_remember').on('click', function() {
                var $this = $(this);
                if ($this.hasClass('remember-check-active')) {
                    $this.removeClass('remember-check-active');
                } else {
                    $this.addClass('remember-check-active');
                }
            });

            $('#btn-login').on('click', function() {
                me.submit();
            });
        },
        validate: function(username, password) {
            if (!username || !password) {
                $('#btn-login').removeAttr('disabled', 'disabled');
                common.toast('用户名或者密码不能为空！');
                $('input[name="username"]').focus();
                return false;
            }
            return true;
        },
        submit: function() {
            //清除IE的cookie
            common.setCookie('accountid', '', -1);
            common.setCookie('usertype', '', -1);
            common.setCookie('orgno', '', -1);
            common.setCookie('token', '', -1);
            $('#btn-login').attr('disabled', 'disabled');
            var username = $.trim($('input[name="username"]').val());
            var userpwd = $.trim($('input[name="password"]').val());
            var isValidate = this.validate(username, userpwd);
            var isRemember = $('#js_remember').hasClass('remember-check-active');
            if (isValidate) {
                common.ajax(api.login, {
                    UserName: username,
                    Password: userpwd
                }, function(res) {
                    if (res.status === 'SUCCESS') {
                        // 默认保存一天
                        common.setCookie('username', username, 1);
                        if (isRemember) {
                            common.setCookie('password', userpwd, 1);
                        }
                        // 存储后台返回状态
                        var data = res.content;
                        common.setCookie('accountid', data.AccountId);
                        common.setCookie('usertype', data.UserType);
                        common.setCookie('orgno', data.OrgNo);
                        common.setCookie('token', data.Token);
                        common.getUserMenu(function(data) {
                            var url = '#authorize/index';
                            if (data.length > 0) {
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].length) {
                                        url = data[i][0].url || '#authorize/index';
                                        break;
                                    }
                                }
                            }
                            window.location.hash = url;
                        });
                    } else {
                        $('#btn-login').removeAttr('disabled', 'disabled');
                        var msg = res.errorMsg;
                        common.toast(msg);
                        return false;
                    }
                }, {
                    action: 'login'
                });
            }
        },
        setloginData: function() {
            var user_value = common.getCookie('username');
            var pass_value = common.getCookie('password');
            $('input[name="username"]').val(user_value || '');
            $('input[name="password"]').val(pass_value || '');
            if (user_value && pass_value) {
                $('#js_remember').addClass('remember-check-active');
            }
        }
    });

    exports.init = function() {
        new login().init();
    };
});