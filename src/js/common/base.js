define("base", [], function() {
    var basicUrl = './js';

    var url;
    // 本地开发
    url = 'http://dev.demo.cn/UIGPS/src';
    // 测试地址
    // url = 'http://120.25.212.193:8082';
    // 正式版地址
    // url = 'http://192.168.1.21:8081';
    window.DOMAIN = url;
    window.staticURL = 'http://dev.demo.cn/UIGPS/src/img'
    seajs.config({
        base: basicUrl,
        charset: 'utf-8',
        alias: {
            page: 'plugin/page.js',
            datepicker: 'plugin/jquery.datetimepicker.js',
            ajaxform: 'plugin/jquery.form.js',
            lodash: 'plugin/lodash.min.js',
            zTree: "plugin/jquery.ztree.core.min.js",
            excheck: 'plugin/jquery.ztree.excheck.js',
            exhide: 'plugin/jquery.ztree.exhide.min.js',
            eventWrapper: 'plugin/EventWrapper.min.js',
            marktool: 'plugin/MarkerTool.js',
            draw: 'plugin/DrawingManager.js',
            dialog: 'plugin/_dialog.js',
            validate: 'plugin/validate.js',
            chosen: 'plugin/chosen.jquery.min.js',
            docEvent: 'common/docEvent.js',
            app: 'app.js',
            api: 'common/api',
            map: 'common/map',
            constValue: 'common/constValue',
            router: 'common/router.js',
            common: 'common/common.js'
        }
    });
});
seajs.use("base");