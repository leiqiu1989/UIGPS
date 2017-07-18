define("base", [], function() {
    var basicUrl = './js';

    window.DOMAIN = 'http://dev.demo.cn/UIGPS/src/en';

    seajs.config({
        base: basicUrl,
        charset: 'utf-8',
        alias: {
            page: 'plugin/page.min.js',
            datepicker: 'plugin/jquery.datetimepicker.js',
            ajaxform: 'plugin/jquery.form.js',
            lodash: 'plugin/lodash.min.js',
            zTree: "plugin/jquery.ztree.core.min.js",
            excheck: 'plugin/jquery.ztree.excheck.js',
            exhide: 'plugin/jquery.ztree.exhide.min.js',
            validate: 'plugin/validate.js',
            chosen: 'plugin/chosen.jquery.min.js',
            markerwithlabel: 'plugin/markerWithLabel.js',
            docEvent: 'common/docEvent.js',
            app: 'app.js',
            api: 'common/api',
            google: 'common/google',
            router: 'common/router.js',
            common: 'common/common.js'
        }
    });
});
seajs.use("base");