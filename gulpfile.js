'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var spritesmith = require("gulp-spritesmith");
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('pug', function buildHTML() {
    return gulp.src('app/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('sass', function () {
    return gulp.src('./app/style/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'));
});


gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean({force: true}))
});

gulp.task('copy', function () {
    return gulp.src(['./app/img/**/*.*', '!./app/img/sprites/**/*.*'], {base: './app'})
        .pipe(gulp.dest('./dist'))
});

gulp.task('watch', function () {
    gulp.watch(['app/style/**/*.scss', 'app/style/*.scss'], gulp.series('sass'));
    gulp.watch(['app/**/*.pug', 'app/*.pug'], gulp.series('pug'));
    gulp.watch(['app/img/**/*.*', 'app/img/*.*'], gulp.series('copy'));
});


//
// gulp.task('sprites', function () {
//     return  gulp.src('./app/img/sprites/*.*')
//         .pipe(spritesmith({
//             imgName: 'sprite.png',
//             styleName: 'sprite.css'
//             // imgPath: '../img/sprite.png'
//         }))
//         .pipe(gulpif('*.png', gulp.dest('./dist/img/')))
//         .pipe(gulpif('*.css', gulp.dest('./dist/css/')));
// });

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel(
        'sass',
        'pug',
        'copy'
    ),
    'watch'
));

