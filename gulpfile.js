'use strict';
var gulp = require('gulp');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var pleeease = require('gulp-pleeease');
var notify = require('gulp-notify');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');
var del = require('del');
var uglify = require('gulp-uglify');
/*
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
*/
const PATHS = (() => {
  var ret = {};
  ret.dist = './dist';
  ret.src = './src';
  ret.dirJs = '/js';
  ret.dirStyle = '/styles';
  ret.entryJs = '/main.js';
  ret.entryStyle = '/main.scss';
  ret.srcEntryJs = `${ret.src}${ret.dirJs}${ret.entryJs}`;
  ret.srcAllJs = `${ret.src}${ret.dirJs}/**/*.js`;
  ret.srcAllScss = `${ret.src}${ret.dirStyle}/**/*.scss`;
  ret.distJs = `${ret.dist}${ret.entryJs}`;
  ret.distStyle = `${ret.dist}${ret.entryStyle}`;
  ret = Object.freeze(ret);
  return ret;
})();
gulp.task('webpack', () => {
  return gulp.src(PATHS.srcEntryJs)
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest(PATHS.dist));
});
gulp.task('sass:core', () => {
  return gulp.src(PATHS.srcAllScss)
    .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(PATHS.dist));
});
gulp.task('sass:option', () => {
  return gulp.src(PATHS.dist + '/**/*.css')
    .pipe(pleeease({ 
    	fallbacks: { autoprefixer: ['last 4 versions'] },
      optimizers: { minifier: true }
    }))
    .pipe(gulp.dest(PATHS.dist));
});
gulp.task('sass', () => {
  runSequence('sass:core', 'sass:option');
});
/*
let imageminWithPath = (srcStr, distStr) => {
    return gulp.src(srcStr)
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest(distStr));
};
gulp.task('imagemin', () => {
    return imageminWithPath(PATHS.globImages, PATHS.dirImageminDist);
});
 */
gulp.task('uglify', () => {
  return gulp.src(PATHS.distJs)
    .pipe(uglify())
    .pipe(gulp.dest(PATHS.dist));
});
gulp.task('webserver', () => {
  return gulp.src(PATHS.dist)
    .pipe(webserver({livereload: true, open: 'http://localhost:8000/'}));
});
gulp.task('build:del', () => {
  return del([PATHS.dist]);
});
gulp.task('build:prebuild', () => {
  return gulp.src('./src/**/*.*', {base:'src',dot: true}).pipe(gulp.dest(PATHS.dist));
});
gulp.task('build:postbuild', () => {
  return del([PATHS.dist + PATHS.dirJs, PATHS.dist + PATHS.dirStyle]);
});
gulp.task('watch', () => {
  gulp.watch([PATHS.srcAllScss], ['sass']);
  gulp.watch([PATHS.srcAllJs], ['webpack']);
  runSequence(['webpack', 'sass'], 'webserver');
});
gulp.task('build', () => {
  runSequence('build:del', 'build:prebuild', ['webpack', 'sass'], ['uglify'], 'build:postbuild');
});



