define(function(require, exports, module) {
    var router = require('router');
    var docEvent = require('docEvent');
    var common = require('common');

    var app = {
        setUserName: function() {
            $('.ja_userName').text(common.getCookie('username'));
        },
        menuEvent: function() {
            $('nav.main-menu').hover(function() {
                $('nav.main-menu').css({
                    width: '250px'
                });
                $('nav.main-menu').find('li.open').children('.submenu').show();
            }, function() {
                $('nav.main-menu').css({
                    width: '53px'
                }).find('.submenu').hide();
            });
            $("nav.main-menu a.link").off().on('click', function() {
                $this = $(this), $next = $this.next();
                $next.slideToggle();
                $this.parent().toggleClass('open');
                $('nav.main-menu').find('.submenu').not($next).slideUp().parent().removeClass('open');
            });
        },
        selectMenu: function(href) {
            this.menuEvent();
            // var me = this;
            // var expand = $('.js-toggleMenu').data('expand');
            // var currTarget = $('a[href="#' + href + '"');
            // if (currTarget.size() > 0) {
            //     var $submenu = $(currTarget).closest('ul.submenu');
            //     if (!expand) {
            //         var li = $(currTarget).parent();
            //         var menuLi = $(li).parents('li');
            //         $('ul.submenu > li').removeClass('active');
            //         $(li).addClass('active');
            //         if (!menuLi.hasClass('active')) {
            //             menuLi.siblings().removeClass('active');
            //             menuLi.addClass('active');
            //         }
            //     } else {
            //         $submenu.show();
            //         $submenu.parent().addClass('open');
            //         $('.accordion .submenu > li > a').removeClass('active');
            //         $(currTarget).addClass('active');
            //         if (href === 'carMonitor/index') {
            //             setTimeout(function() {
            //                 me.adjustBox();
            //             }, 100);
            //         }
            //     }
            // }
        },
        _init: function() {
            var me = this;
            router.init({
                beforeLoad: function(mod, href) {
                    //登录页和其他页面的切换
                    if (mod !== 'login') {
                        $('body').removeClass('logn-bg');
                        var username = common.getCookie('username') || '';
                        if (!username) {
                            common.clearData();
                            window.location.hash = '#login/login';
                            return false;
                        }
                        if ($('.admin-sidebar').size() < 1) {
                            require.async('./../tpl/index/index', function(tpl) {
                                $('#admin').empty().html(template.compile(tpl)());
                                // 获取用户配置权限，初始化菜单
                                common.getUserMenu(function(data) {
                                    if (data.length > 0) {
                                        require.async('./../tpl/menu/index', function(tpl) {
                                            $('.admin-sidebar').empty().html(template.compile(tpl)({ data: data }));
                                            if (href != 'authorize') {
                                                me.selectMenu(href);
                                            }
                                            me.setUserName();
                                        });
                                    } else {
                                        window.location.hash = '#authorize/index';
                                        return false;
                                    }
                                });
                            });
                        } else {
                            me.setUserName();
                            me.selectMenu(href);
                        }
                        // 清除监控
                        if (mod !== 'carMonitor') {
                            common.stopMonitorTimer();
                        }
                        // 清除历史位置查询参数
                        if (mod !== 'historyLocation' && mod !== 'carMonitor') {
                            common.removeLocationStorage('historyLocationParams');
                        }
                    }
                    return true;
                }
            }).run();
            // 监听document事件
            this._docEvent();
        },
        _docEvent: function() {
            docEvent.init();
        }
    };
    module.exports = app;
});