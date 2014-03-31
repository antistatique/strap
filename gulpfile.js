var gulp = require('gulp'),
  gutil = require('gulp-util'),
  notify = require('gulp-notify'),
  jshint = require('gulp-jshint'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  browserSync = require('browser-sync'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  stylish = require('jshint-stylish');

// JS task
gulp.task('scripts', function() {
  gulp.src('./assets/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./assets/js/build'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

// JS vendors concat and minify
gulp.task('scripts_vendors', function() {
  gulp.src([
      './vendors/bootstrap-sass/js/*.js'
    ])
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

// SASS compile, autoprefix and minify task
gulp.task('styles', function() {
  return gulp.src('./assets/sass/strap.scss')
    .pipe(sass())
    .on('error', gutil.beep)
    .on('error', notify.onError("Error: <%= error.message %>"))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(minifycss())
    .pipe(gulp.dest('./build/css'));
});


gulp.task('browser-sync', function() {
  browserSync.init(['./assets/css/*.css', '*.php', './assets/js/*.js'], {
    proxy: 'localhost'
  });
});

gulp.task('default', ['scripts', 'styles', 'watch']);

gulp.task('build', ['scripts', 'styles']);

gulp.task('sync', ['scripts', 'styles', 'watch', 'browser-sync']);


gulp.task('watch', function() {
  gulp.watch('./assets/sass/*.scss', ['styles']);
  gulp.watch('./assets/js/*.js', ['scripts']);
});