var del          = require('del');
var run          = require('gulp4-run-sequence');
var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var stylelint    = require('gulp-stylelint');
var cleanCSS     = require('gulp-clean-css');
var size         = require('gulp-size');
var postcss      = require('gulp-postcss');
var postcssPresetEnv = require('postcss-preset-env');
var base64       = require('gulp-base64');
var svgstore     = require('gulp-svgstore');
var svgmin       = require('gulp-svgmin');
var change       = require('gulp-change');


function addSourcesTimestamp(content) {
    var source = content.split('\n');
    var outputLine = '';
    var result = '';

    var timestamp = Math.round(new Date().getTime() / 1000);


    source.forEach(function (line) {

        if( line.indexOf('rel="stylesheet"') !== -1 ) {
            outputLine = line.replace('.css"', '.css?' + timestamp + '"');
            result += outputLine + '\n';
        }
        else if ( line.indexOf('<script') !== -1 && line.indexOf('src="') !== -1 && line.indexOf('vendors/') === -1) {
            outputLine = line.replace('.js"', '.js?' + timestamp + '"');
            result += outputLine + '\n';
        }
        else {
            result += line + '\n';
        }

    });

    return result;
}


// Clean up build folder

gulp.task('clean', function() {
  return del('build/*');
});


// Manifest: copy

gulp.task('quotalogic.io_manifest', function () {
    return gulp.src([
        'src/global/browserconfig.xml',
        'src/global/site.webmanifest',
        'src/global/humans.txt',
        'src/global/favicon.ico'])
    .pipe(plumber())
    .pipe(gulp.dest('build/global/public_html/'))
    ;
});


// Favicon: copy

gulp.task('quotalogic.io_favicon', function () {
    return gulp.src('src/global/favicon/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('build/global/public_html/favicon/'))
        ;
});

// Temp: copy

gulp.task('quotalogic.io_temp', function() {
  return gulp.src('src/global/temp/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('build/global/public_html/temp/'))
  ;
});


// Content: copy

gulp.task('quotalogic.io_content', function() {
  return gulp.src('src/global/content/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('build/global/public_html/content/'))
  ;
});


// Images: copy

gulp.task('quotalogic.io_images', function() {
  return gulp.src('src/global/images/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('build/global/public_html/images/'))
  ;
});


// Fonts: copy

gulp.task('quotalogic.io_fonts', function() {
  return gulp.src('src/global/fonts/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('build/global/public_html/fonts/'))
  ;
});


// Layouts: copy

gulp.task('quotalogic.io_layouts', function() {
  return gulp.src('src/global/*.html')
      .pipe(plumber())
      .pipe(change(addSourcesTimestamp))
      .pipe(gulp.dest('build/global/public_html/'))
  ;
});


// Vendors: copy but exclude normalize

gulp.task('quotalogic.io_vendors', function() {
  return gulp.src([
      'src/global/vendors/**/*',
      '!src/global/vendors/normalize',
      '!src/global/vendors/normalize/**/*',
  ])
      .pipe(plumber())
      .pipe(gulp.dest('build/global/public_html/vendors/'))
  ;
});


// Scripts: copy

gulp.task('quotalogic.io_scripts', function() {
  return gulp.src('src/global/scripts/**/*')
      .pipe(plumber())
      .pipe(gulp.dest('build/global/public_html/scripts/'))
  ;
});


// Styles: concat, add prefixes, compress, copy

gulp.task('quotalogic.io_styles', function() {

  var processors = [
    postcssPresetEnv()
  ];

  return gulp.src([
    'src/global/styles/style.css'
  ])
      .pipe(plumber())
      .pipe(cleanCSS({
        advanced: false,
        keepSpecialComments: 0
      }))
      .pipe(postcss(processors))
      .pipe(base64({
        // Allow files from /vectors/ only
        exclude: ['/sprite/', '/images/']
      }))
      .pipe(gulp.dest('build/global/public_html/styles/'))
      .pipe(size())
  ;
});


// lint

gulp.task('quotalogic.io_lint', function() {

  return gulp.src([
    '!src/global/styles/style.css',
    'src/global/styles/**/*.css'
  ])
      .pipe(plumber())
      .pipe(stylelint({
          reporters: [
              {formatter: 'string', console: true}
          ]
      }))
  ;
});


gulp.task('default', function (fn) {
    run('clean',
        'quotalogic.io_manifest',
        'quotalogic.io_favicon',
        'quotalogic.io_temp',
        'quotalogic.io_content',
        'quotalogic.io_images',
        'quotalogic.io_fonts',
        'quotalogic.io_layouts',
        'quotalogic.io_vendors',
        'quotalogic.io_scripts',
        'quotalogic.io_styles',
        'quotalogic.io_lint',
        fn
    );
});



