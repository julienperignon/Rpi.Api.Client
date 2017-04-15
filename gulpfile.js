var gulp = require('gulp'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    del = require('del');

gulp.task('default',function(){
     gulp.start('styles', 'scripts', 'html');;
});

gulp.task('--dev',function(){
     gulp.start('watch');;
});


gulp.task('rebuild',function(){
     gulp.start('clean', 'default'/*, 'images'*/);;
});

gulp.task('watch', function() {

 // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/js/**/*.js', ['scripts']);

// Watch .js files
  gulp.watch('src/html/**/*.html', ['html']);

  // Watch image files
  //gulp.watch('src/images/**/*', ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});

gulp.task('clean', function(){
    return del('/dist/**/*');
});


gulp.task('html', function() {
  return gulp.src('src/html/**/*.html')
    .pipe(gulp.dest('dist/html'))
    .pipe(notify({ message: 'Html task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});


gulp.task('styles', function() {
  return gulp.src('src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});