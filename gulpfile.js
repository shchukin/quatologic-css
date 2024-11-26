var del = require('del');
var run = require('gulp4-run-sequence');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var stylelint = require('gulp-stylelint');
var cleanCSS = require('gulp-clean-css');
var size = require('gulp-size');
var postcss = require('gulp-postcss');
var postcssPresetEnv = require('postcss-preset-env');
var base64 = require('gulp-base64');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var change = require('gulp-change');


/* Удаляем все '../global/' из html-кода, каждый проект после сборки будет включать в себя всё нужное локально из своей папки: */
function changeGlobalPath(content) {
    return content.split('\n').map(line =>
        line.includes('../global/') ? line.replaceAll('../global/', '') : line
    ).join('\n');
}

function addSourcesTimestamp(content) {
    const timestamp = Math.round(Date.now() / 1000);

    return content.split('\n').map(line => {
        if (line.includes('rel="stylesheet"')) {
            return line.replace('.css"', `.css?${timestamp}"`);
        } else if (line.includes('<script') && line.includes('src="') && !line.includes('vendors/') && !line.includes('http') && !line.includes('https') && !line.includes('cdn')) {
            return line.replace('.js"', `.js?${timestamp}"`);
        } else {
            return line;
        }
    }).join('\n');
}


// Clean up build folder

gulp.task('clean', function () {
    return del('build/*');
});


// Layouts: copy

gulp.task('quotalogic.io_layouts', function () {
    return gulp.src([
        'src/quotalogic.io/*.html',
        'src/quotalogic.io/*.shtml',
        'src/quotalogic.io/*.php'
    ])
        .pipe(plumber())
        .pipe(change(changeGlobalPath))
        .pipe(change(addSourcesTimestamp))
        .pipe(gulp.dest('build/quotalogic.io/public_html/'))
        ;
});

gulp.task('quotcat.ru_layouts', function () {
    return gulp.src([
        'src/quotcat.ru/*.html',
        'src/quotcat.ru/*.shtml',
        'src/quotcat.ru/*.php'
    ])
        .pipe(plumber())
        .pipe(change(changeGlobalPath))
        .pipe(change(addSourcesTimestamp))
        .pipe(gulp.dest('build/quotcat.ru/public_html/'))
        ;
});


// Manifest: copy

gulp.task('quotalogic.io_manifest', function () {
    return gulp.src([
        'src/global/browserconfig.xml',
        'src/global/site.webmanifest',
        'src/global/humans.txt',
        'src/global/favicon.ico'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('build/quotalogic.io/public_html/'))
        ;
});

gulp.task('quotcat.ru_manifest', function () {
    return gulp.src([
        'src/global/browserconfig.xml',
        'src/global/site.webmanifest',
        'src/global/humans.txt',
        'src/global/favicon.ico'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('build/quotcat.ru/public_html/'))
        ;
});


// Favicon: copy

gulp.task('quotalogic.io_favicon', function () {
    return gulp.src([
        'src/global/favicon/**/*',
        'src/quotalogic.io/favicon/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('build/quotalogic.io/public_html/favicon/'))
        ;
});

gulp.task('quotcat.ru_favicon', function () {
    return gulp.src([
        'src/global/favicon/**/*',
        'src/quotcat.ru/favicon/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('build/quotcat.ru/public_html/favicon/'))
        ;
});

// Temp: copy

gulp.task('quotalogic.io_temp', function () {
    return gulp.src([
        'src/global/temp/**/*',
        'src/quotalogic.io/temp/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('build/quotalogic.io/public_html/temp/'))
        ;
});

gulp.task('quotcat.ru_temp', function () {
    return gulp.src([
        'src/global/temp/**/*',
        'src/quotcat.ru/temp/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('build/quotcat.ru/public_html/temp/'))
        ;
});


// Content: copy

gulp.task('quotalogic.io_content', function () {
    return gulp.src([
        'src/global/content/**/*',
        'src/quotalogic.io/content/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('build/quotalogic.io/public_html/content/'))
        ;
});

gulp.task('quotcat.ru_content', function () {
    return gulp.src([
        'src/global/content/**/*',
        'src/quotcat.ru/content/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('build/quotcat.ru/public_html/content/'))
        ;
});


// Images: copy

gulp.task('quotalogic.io_images', function () {
    return gulp.src([
        'src/global/images/**/*',
        'src/quotalogic.io/images/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('build/quotalogic.io/public_html/images/'))
        ;
});

gulp.task('quotcat.ru_images', function () {
    return gulp.src([
        'src/global/images/**/*',
        'src/quotcat.ru/images/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('build/quotcat.ru/public_html/images/'))
        ;
});


// Fonts: copy

gulp.task('quotalogic.io_fonts', function () {
    return gulp.src([
        'src/global/fonts/**/*',
        'src/quotalogic.io/fonts/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('build/quotalogic.io/public_html/fonts/'))
        ;
});

gulp.task('quotcat.ru_fonts', function () {
    return gulp.src([
        'src/global/fonts/**/*',
        'src/quotcat.ru/fonts/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('build/quotcat.ru/public_html/fonts/'))
        ;
});


// Vendors: copy but exclude normalize (it will be injected into CSS file)

gulp.task('quotalogic.io_vendors', function () {
    return gulp.src([
        'src/global/vendors/**/*',
        'src/quotalogic.io/vendors/**/*',
        '!src/global/vendors/normalize'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('build/quotalogic.io/public_html/vendors/'))
        ;
});

gulp.task('quotcat.ru_vendors', function () {
    return gulp.src([
        'src/global/vendors/**/*',
        'src/quotcat.ru/vendors/**/*',
        '!src/global/vendors/normalize'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('build/quotcat.ru/public_html/vendors/'))
        ;
});


// Scripts: copy

gulp.task('quotalogic.io_scripts', function () {
    return gulp.src([
        'src/global/scripts/**/*',
        'src/quotalogic.io/scripts/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('build/quotalogic.io/public_html/scripts/'))
        ;
});

gulp.task('quotcat.ru_scripts', function () {
    return gulp.src([
        'src/global/scripts/**/*',
        'src/quotcat.ru/scripts/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('build/quotcat.ru/public_html/scripts/'))
        ;
});


// Styles: concat, add prefixes, compress, copy

gulp.task('quotalogic.io_styles', function () {

    var processors = [
        postcssPresetEnv()
    ];

    return gulp.src([
        'src/quotalogic.io/styles/styles.css'
    ])
        .pipe(plumber())
        .pipe(cleanCSS({
            advanced: false,
            keepSpecialComments: 0
        }))
        .pipe(change(changeGlobalPath))
        .pipe(postcss(processors))
        .pipe(base64({
            // Allow files from /vectors/ only
            exclude: ['/sprite/', '/images/']
        }))
        .pipe(gulp.dest('build/quotalogic.io/public_html/styles/'))
        .pipe(size())
        ;
});

gulp.task('quotcat.ru_styles', function () {

    var processors = [
        postcssPresetEnv()
    ];

    return gulp.src([
        'src/quotcat.ru/styles/styles.css'
    ])
        .pipe(plumber())
        .pipe(cleanCSS({
            advanced: false,
            keepSpecialComments: 0
        }))
        .pipe(change(changeGlobalPath))
        .pipe(postcss(processors))
        .pipe(base64({
            // Allow files from /vectors/ only
            exclude: ['/sprite/', '/images/']
        }))
        .pipe(gulp.dest('build/quotcat.ru/public_html/styles/'))
        .pipe(size())
        ;
});


// lint

gulp.task('quotalogic.io_lint', function () {

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

gulp.task('quotcat.ru_lint', function () {

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
        'quotalogic.io_layouts',  'quotcat.ru_layouts',
        'quotalogic.io_manifest', 'quotcat.ru_manifest',
        'quotalogic.io_fonts',    'quotcat.ru_fonts',
        'quotalogic.io_favicon',  'quotcat.ru_favicon',
        'quotalogic.io_temp',     'quotcat.ru_temp',
        'quotalogic.io_content',  'quotcat.ru_content',
        'quotalogic.io_images',   'quotcat.ru_images',
        'quotalogic.io_vendors',  'quotcat.ru_vendors',
        'quotalogic.io_scripts',  'quotcat.ru_scripts',
        'quotalogic.io_styles',   'quotcat.ru_styles',
        'quotalogic.io_lint',     'quotcat.ru_lint',
        fn
    );
});



