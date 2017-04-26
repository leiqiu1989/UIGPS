define(function(require, exports, module) {
    var common = require('common');
    var api = require('api');
    var tpl = require('./../../tpl/login/login');

    function login() {}

    $.extend(login.prototype, {
        init: function() {
            $('#admin').empty().html(template.compile(tpl)({ staticURL: window.DOMAIN }));
            common.layUIForm();
            $('#slider').vmcSlider({
                width: 750,
                height: 455,
                gridCol: 10,
                gridRow: 5,
                gridVertical: 20,
                gridHorizontal: 10,
                autoPlay: true,
                ascending: true,
                effects: [
                    'fade', 'fadeLeft', 'fadeRight', 'fadeTop', 'fadeBottom', 'fadeTopLeft', 'fadeBottomRight',
                    'blindsLeft', 'blindsRight', 'blindsTop', 'blindsBottom', 'blindsTopLeft', 'blindsBottomRight',
                    'curtainLeft', 'curtainRight', 'interlaceLeft', 'interlaceRight', 'mosaic', 'bomb', 'fumes'
                ],
                ie6Tidy: false,
                random: false,
                duration: 2000,
                speed: 900
            });
            $('input[name="username"]').focus();
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
            $('.lang-item').on('click', function() {
                $(this).addClass('active').siblings().removeClass('active');
            });
            $('.js-login').on('click', function() {
                me.submit();
            });
        },
        validate: function(username, password) {
            if (!username || !password) {
                $('.js-login').removeClass('login-btn-disabled');
                common.layMsg('Username or password can not be empty!');
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
            $('.js-login').addClass('login-btn-disabled');
            var username = $.trim($('input[name="username"]').val());
            var userpwd = $.trim($('input[name="password"]').val());
            var isValidate = this.validate(username, userpwd);
            if (isValidate) {
                common.ajax(api.login, {
                    UserName: username,
                    Password: userpwd
                }, function(res) {
                    if (res.status === 'SUCCESS') {
                        // 默认保存一天
                        common.setCookie('username', username, 1);
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
                        $('.js-login').removeClass('login-btn-disabled');
                        var msg = res.errorMsg;
                        common.layMsg(msg);
                        return false;
                    }
                }, {
                    action: 'login'
                });
            }
        }
    });

    exports.init = function() {
        new login().init();
    };
});