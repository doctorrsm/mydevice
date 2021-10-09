const {
  src,
  dest
} = require('gulp');
const {
  watch,
  series,
  parallel
} = require('gulp');
const gulp =    require('gulp');
const svgSprite = require('gulp-svg-sprite');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const postcss = require('gulp-postcss');
const sorting = require('postcss-sorting');
const browserSync = require('browser-sync').create();


const svgSprintConfig = {
  mode: {
    css: { // Activate the «css» mode
      render: {
        css: true // Activate CSS output (with default options)
      }
    }
  }
};


exports.views = () => {
  return src('./src/*.pug')
    .pipe(
      pug({
        // Your options in here.
        pretty: falseb
      })
    )
    .pipe(dest('./dist'));
};

exports.svgsp = () => {
  return src('./src/images/icons/**/*.svg')
  .pipe(svgSprite(svgSprintConfig))
  .pipe(dest('./dist/images/svg'));
};



exports['sort']= () => {
  return src('./dist/css/*.css')
  .pipe(
    postcss([
      sorting({
        /* options */
        'properties-order': [
          'position',
          'top',
          'right',
          'bottom',
          'left',
          'z-index',
          'display',
          'float',
          'width',
          'height',
          'marign',
          'padding'

        ],
        'unspecified-properties-position': 'bottom'
      }),
    ])
  )
  .pipe(gulp.dest('./dist/css/'));
};

exports['sortscss']= () => {
  return src('./src/sass/**/*.scss')
  .pipe(
    postcss([
      sorting({
        /* options */
        'properties-order': [
          'position',
          'top',
          'right',
          'bottom',
          'left',
          'z-index',
          'display',
          'float',
          'width',
          'height',
          'marign',
          'padding'

        ],
        'unspecified-properties-position': 'bottom'
      }),
    ])
  )
  .pipe(gulp.dest('./src/sass/'));
};



exports.img = () => {
  return gulp.src('./src/images/**/*.*')
    .pipe(gulp.dest('./dist/images'));
};

exports.browsersyncServe = () => {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });

}

function browsersyncServe() {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });

}

function browsersyncReload() {
  browserSync.reload();

}



function html() {
  return src('./src/*.pug')
    .pipe(
      pug({
        // Your options in here.
        pretty: true
      })
    )
    .pipe(dest('./dist'));
};

function img() {
  return gulp.src('./src/images/**/*.*')
    .pipe(gulp.dest('./dist/images'));
};


function css() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
};

function watchTask() {
  watch('./src/**/**/*.pug').on('change', series(html, browsersyncReload));
  watch('./src/sass/**/*.scss').on('change', series(css, browsersyncReload));
}

exports.default =
  parallel(html, css, img, parallel(watchTask, browsersyncServe));
