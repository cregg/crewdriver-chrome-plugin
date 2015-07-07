// Gulp Dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');

// Build Dependencies
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var reactify = require('reactify');


// Style Dependencies
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// Development Dependencies
var jshint = require('gulp-jshint');

// Test Dependencies
var mochaPhantomjs = require('gulp-mocha-phantomjs');

// Open Index
var open = require('gulp-open');

// Set env variables
var env = require('gulp-env');

var gutil = require('gulp-util');

gulp.task('lint-client', function() {
  return gulp.src('./client/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('lint-test', function() {
  return gulp.src('./test/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('browserify-client', ['lint-client'], function() {
  return gulp.src('client/index.jsx')
    .pipe(browserify({
      insertGlobals: true,
      transform: [reactify]
    }))
    .pipe(rename('crewdriver.js'))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('browserify-test', ['lint-test'], function() {
  return gulp.src('test/client/index.jsx')
    .pipe(browserify({
      insertGlobals: true,
      transform: [reactify]    
    }))
    .pipe(rename('client-test.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('test', ['lint-test', 'browserify-test'], function() {
  return gulp.src('test/client/index.html')
    .pipe(mochaPhantomjs());
});

gulp.task('watch', function() {
  gulp.watch('client/**/*.js', ['browserify-client']);
  gulp.watch('client/**/*.jsx', ['browserify-client']);
  gulp.watch('test/client/**/*.js', ['browserify-test']);
});

gulp.task('styles', function() {
  return gulp.src('client/less/*.less')
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('crewdriver.css'))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('minify', ['styles'], function() {
  return gulp.src('build/crewdriver.css')
    .pipe(minifyCSS())
    .pipe(rename('crewdriver.min.css'))
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('uglify', ['browserify-client'], function() {
  return gulp.src('build/crewdriver.js')
    .pipe(uglify().on('error', gutil.log))
    .pipe(rename('crewdriver.min.js'))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('open', function(){
  return gulp.src('public/index.html')
  .pipe(open());
});

gulp.task('build', ['minify', 'uglify']);

gulp.task('default', ['test', 'build', 'watch']);
