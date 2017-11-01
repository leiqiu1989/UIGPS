var gulp = require('gulp');

//引用外包
var tpl = require('gulp-tpl'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-minify-css'),
    transport = require("gulp-seajs-transport"),
    concatSeajs = require("gulp-seajs-concat");

//参数 {version} 控制版本号
var option = {
    zh: './src/zh',
    en: './src/en',
    zhDist: './dist/zh',
    enDist: './dist/en',
    version: '20171101'
};

// 中文配置
option.zhtpl = option.zh + '/tpl';
option.zhsrc = option.zhDist + '/' + option.version;
option.zhjs = option.zh + '/js/**/*.js';
// 英文配置
option.entpl = option.en + '/tpl';
option.ensrc = option.enDist + '/' + option.version;
option.enjs = option.en + '/js/**/*.js';

//压缩js - 中文版
gulp.task('transport', function() {
    return gulp.src([option.zhjs, option.zh + '/js/*.js'])
        .pipe(transport())
        .pipe(concatSeajs({
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
                validate: 'plugin/validate.min.js',
                chosen: 'plugin/chosen.jquery.min.js',
                docEvent: 'common/docEvent.js',
                app: 'app.js',
                api: 'common/api',
                map: 'common/map',
                router: 'common/router.js',
                common: 'common/common.js'
            }
        }))
        .pipe(uglify())
        .pipe(gulp.dest(option.zhsrc + '/js'));
});

//图片合到最新版本 - 中文版
gulp.task('image', function() {
    return gulp.src(['./src/zh/img/**/*'])
        .pipe(gulp.dest(option.zhsrc + '/img'));
});

//layui - 中文版
gulp.task('layui', function() {
    return gulp.src(['./src/zh/layui/**/*']).pipe(gulp.dest(option.zhsrc + '/layui'));
});

//font-awesome - 中文版
gulp.task('font-awesome', function() {
    return gulp.src(['./src/zh/font-awesome/**/*']).pipe(gulp.dest(option.zhsrc + '/font-awesome'));
});

//css合并最新版本 - 中文版
gulp.task('minify-css', function() {
    return gulp.src(option.zh + '/css/**/*.css')
        .pipe(minifyCss({ compatibility: { properties: { iePrefixHack: true } } }))
        .pipe(gulp.dest(option.zhsrc + '/css'));
});

//将*.tpl 编译成*.js - 中文版
gulp.task('tpl', function() {
    return gulp.src(option.zhtpl + '/**/*.tpl')
        .pipe(tpl())
        .pipe(gulp.dest(option.zhtpl));
});

//将所有的tpl移到最新版本 - 中文版
gulp.task('tplPub', ['tpl'], function() {
    return gulp.src(option.zhtpl + '/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(option.zhsrc + '/tpl'));
});

//监听tpl - 中文版
gulp.task('watch', function() {
    gulp.watch(option.zhtpl + '/**/*.tpl', ['dev']);
});


//dev 开发可跑此任务，建议watch来监听
gulp.task('dev', ['tpl']);

//运行他前，先改版本号
gulp.task('publish', ['tpl', 'transport', 'minify-css', 'image', 'layui', 'font-awesome', 'tplPub']);


/*************英文版本打包 ********************/
//压缩js - 英文版
gulp.task('transport-en', function() {
    return gulp.src([option.enjs, option.en + '/js/*.js'])
        .pipe(transport())
        .pipe(concatSeajs({
            alias: {
                page: 'plugin/page.min.js',
                datepicker: 'plugin/jquery.datetimepicker.js',
                ajaxform: 'plugin/jquery.form.js',
                lodash: 'plugin/lodash.min.js',
                zTree: "plugin/jquery.ztree.core.min.js",
                excheck: 'plugin/jquery.ztree.excheck.js',
                exhide: 'plugin/jquery.ztree.exhide.min.js',
                validate: 'plugin/validate.min.js',
                chosen: 'plugin/chosen.jquery.min.js',
                markerwithlabel: 'plugin/markerWithLabel.js',
                docEvent: 'common/docEvent.js',
                app: 'app.js',
                api: 'common/api',
                map: 'common/map',
                router: 'common/router.js',
                common: 'common/common.js'
            }
        }))
        .pipe(uglify())
        .pipe(gulp.dest(option.ensrc + '/js'));
});

//图片合到最新版本 - 英文版
gulp.task('image-en', function() {
    return gulp.src(['./src/en/img/**/*'])
        .pipe(gulp.dest(option.ensrc + '/img'));
});

//layui - 英文版
gulp.task('layui-en', function() {
    return gulp.src(['./src/en/layui/**/*']).pipe(gulp.dest(option.ensrc + '/layui'));
});

//font-awesome - 英文版
gulp.task('font-awesome-en', function() {
    return gulp.src(['./src/en/font-awesome/**/*']).pipe(gulp.dest(option.ensrc + '/font-awesome'));
});

//css合并最新版本 - 英文版
gulp.task('minify-css-en', function() {
    return gulp.src(option.en + '/css/**/*.css')
        .pipe(minifyCss({ compatibility: { properties: { iePrefixHack: true } } }))
        .pipe(gulp.dest(option.ensrc + '/css'));
});

//将*.tpl 编译成*.js - 英文版
gulp.task('tpl-en', function() {
    return gulp.src(option.entpl + '/**/*.tpl')
        .pipe(tpl())
        .pipe(gulp.dest(option.entpl));
});

//将所有的tpl移到最新版本 - 英文版
gulp.task('tplPub-en', ['tpl-en'], function() {
    return gulp.src(option.entpl + '/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(option.ensrc + '/tpl'));
});

//监听tpl - 英文版
gulp.task('watch-en', function() {
    gulp.watch(option.entpl + '/**/*.tpl', ['dev-en']);
});


//dev 开发可跑此任务，建议watch来监听
gulp.task('dev-en', ['tpl-en']);

//运行他前，先改版本号
gulp.task('publish-en', ['tpl-en', 'transport-en', 'minify-css-en', 'image-en', 'layui-en', 'font-awesome-en', 'tplPub-en']);