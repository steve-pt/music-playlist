'use strict';

//Dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var please = require('gulp-pleeease');
var rename = require('gulp-rename');
var changed = require('gulp-changed');


//Paths
var SCSS_SRC = './src/assets/scss/**/*.scss';
var SCSS_DEST = './src/assets/css';


//Compile SCSS
gulp.task('compile_scss',function(){

    gulp.src(SCSS_SRC)
    .pipe(sass().on('error',sass.logError))
    .pipe(minifyCSS())
    .pipe(please())
    .pipe(concat("default.min.css"))
    .pipe(changed(SCSS_DEST))
    .pipe(gulp.dest(SCSS_DEST));
});


//Changes in SCSS
gulp.task('watch_scss',function(){
    gulp.watch(SCSS_SRC,['compile_scss']);
})


//Run Task
gulp.task('default',['watch_scss']);