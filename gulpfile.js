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
    cwd: './src',
    dist: './dist',
    version: '20161225'
};

option.tpl = option.cwd + '/tpl';
option.src = option.dist + '/' + option.version;
option.js = option.cwd + '/js/**/*.js';


//压缩js
gulp.task('transport', function() {
    return gulp.src([option.js, option.cwd + '/js/*.js'])
        .pipe(transport())
        .pipe(concatSeajs({
            alias: {
                page: 'plugin/common/page.js',
                datepicker: 'plugin/jquery.datetimepicker.js',
                ajaxform: 'plugin/jquery.form.js',
                lodash: 'plugin/lodash.min.js',
                dialog: 'plugin/common/_dialog.js',
                validate: 'plugin/common/validate.js',
                chosen: 'plugin/chosen.jquery.min.js',
                docEvent: 'common/docEvent.js',
                app: 'app.js',
                api: 'common/api',
                map: 'common/map',
                constValue: 'common/constValue',
                router: 'common/router.js',
                common: 'common/common.js'
            }
        }))
        .pipe(uglify())
        .pipe(gulp.dest(option.src + '/js'));
});

//图片合到最新版本
gulp.task('image', function() {
    return gulp.src(['./src/**/*.png', './src/**/*.jpg', './src/**/*.gif', './src/**/*.ico'])
        .pipe(gulp.dest(option.src));
});

//tinyUi
gulp.task('tinyui', function() {
    return gulp.src(['./src/tiny/**/*.css', './src/tiny/**/*.js',
        './src/tiny/**/*.eot', './src/tiny/**/*.svg', './src/tiny/**/*.ttf',
        './src/tiny/**/*.woff', './src/tiny/**/*.woff2'
    ]).pipe(gulp.dest(option.src + '/tiny'));
});

//font-awesome
gulp.task('font-awesome', function() {
    return gulp.src(['./src/font-awesome/**/*.css',
        './src/font-awesome/**/*.otf', './src/font-awesome/**/*.eot', './src/font-awesome/**/*.svg',
        './src/font-awesome/**/*.ttf', './src/font-awesome/**/*.woff', './src/font-awesome/**/*.woff2'
    ]).pipe(gulp.dest(option.src + '/font-awesome'));
});

//css合并最新版本
gulp.task('minify-css', function() {
    return gulp.src(option.cwd + '/css/**/*.css')
        .pipe(minifyCss({ compatibility: { properties: { iePrefixHack: true } } }))
        .pipe(gulp.dest(option.src + '/css'));
});

//将*.tpl 编译成*.js
gulp.task('tpl', function() {
    return gulp.src(option.tpl + '/**/*.tpl')
        .pipe(tpl())
        .pipe(gulp.dest(option.tpl));
});

//将所有的tpl移到最新版本
gulp.task('tplPub', ['tpl'], function() {
    return gulp.src(option.tpl + '/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(option.src + '/tpl'));
});

//监听tpl
gulp.task('watch', function() {
    gulp.watch(option.tpl + '/**/*.tpl', ['dev']);
});


//dev 开发可跑此任务，建议watch来监听
gulp.task('dev', ['tpl']);

//运行他前，先改版本号
gulp.task('publish', ['tpl', 'transport', 'minify-css', 'image', 'tinyui', 'font-awesome', 'tplPub']);