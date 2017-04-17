var gulp = require('gulp'),
  notify = require('gulp-notify'),
  livereload = require('gulp-livereload'),
  cssnano = require('gulp-cssnano'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  inject = require('gulp-inject'),
  del = require('del'),
  debug = require('gulp-debug'),
  series = require('stream-series'),
  runsequence = require('run-sequence');

var packageJson = require('./package.json');


gulp.task('default', function () {

  runsequence('clean', 'styles', 'dependencies', 'scripts', 'html')
});


// gulp.task('rebuild',function(){
//      gulp.start('clean', 'default');
// });

gulp.task('dev', function () {

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

gulp.task('clean', function () {
  return del('dist/**/*');
});


// gulp.task('html',['inject-dependencies'], function() {
//   return gulp.src('src/html/**/*.html')
//     .pipe(gulp.dest('dist/'))
//     .pipe(notify({ message: 'Html task complete' }));
// });

gulp.task('scripts', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('main.js'))
    // .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// gulp.task('dependencies', function() {
//   return gulp.src('node_modules/{angular,bootstrap}/dist/**/*.min.{js,css}')
//     .pipe(rename({dirname: ''}))
//     .pipe(gulp.dest('dist/dependencies'))
//     .pipe(notify({ message: 'Scripts dependencies complete' }));
// });

gulp.task('dependencies', function () {
  // var modules = Object.keys(packageJson.dependencies);
  // var moduleFiles = modules.map(function(module) {
  //   return 'node_modules/' + module + '/{dist/**/*.{js,css},/**/*.{js,css}}';
  // });
  return gulp.src(['node_modules/jquery/dist/jquery.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/bootstrap/dist/**/*.min.{js,css}'])
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest('dist/dependencies'));
});


gulp.task('styles', function () {
  return gulp.src('src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('html', function () {
  var target = gulp.src('src/html/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:

  var jqueryStream = gulp.src('dist/**/*jquery*.js', { read: false });
  var otherStreams = gulp.src(['!dist/**/*jquery*.js','dist/**/*.js', 'dist/**/*.css'], { read: false });

  //gulp.src(['/**/*.js', '/**/*.css'],{cwd:"./dist"}).pipe(debug());


  return target.pipe(inject(series(jqueryStream,otherStreams), { ignorePath: 'dist' }))
    .pipe(gulp.dest('./dist'));
});
