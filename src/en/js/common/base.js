define("base", [], function() {
    var basicUrl = './js';

    window.DOMAIN = 'http://192.168.1.21:8081';

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
            eventWrapper: 'plugin/EventWrapper.min.js',
            marktool: 'plugin/MarkerTool.js',
            draw: 'plugin/DrawingManager.js',
            validate: 'plugin/validate.min.js',
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