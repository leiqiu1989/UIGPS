define(function(require, exports, module) {
    'use strict';

    // 模板
    var tpls = {
        index: require('../../tpl/authorize/index')
    };

    function authorize() {}
    $.extend(authorize.prototype, {
        init: function() {
            // 渲染模板
            $('#main-content').empty().html(template.compile(tpls.index)());
        }
    });
    exports.init = function() {
        new authorize().init();
    };
});