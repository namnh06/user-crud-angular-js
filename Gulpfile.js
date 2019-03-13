var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  postcss = require('gulp-postcss'),
  cssnano = require('cssnano'),
  autoprefixer = require('autoprefixer'),
  uglify = require('gulp-uglify'),
  del = require('del'),
  concat = require('gulp-concat'),
  paths = {
    'ROOT': './',
    get APP() {
      return this.ROOT + 'app'
    },
    get ASSETS() {
      return this.APP + '/assets'
    },
    get SCSS() {
      return this.ASSETS + '/scss/**/*.scss'
    },
    get CSS() {
      return this.ASSETS + '/css/'
    },
    get DIST() {
      return this.ROOT + 'dist'
    }
  },
  htmlWatcher = gulp.watch([paths.ROOT + '**/*.html']),
  javascriptWatcher = gulp.watch([paths.ROOT + '**/*.js']);


/** Browser Sync */
function browser() {
  browserSync.init({
    server: {
      baseDir: paths.ROOT
    },
    port: 3002
  });
}

/** BrowserSync Reload */
function browserSyncReload() {
  browserSync.reload();
}

function css() {
  return gulp.src(paths.SCSS)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded"
    }).on('error', sass.logError))
    .pipe(gulp.dest(paths.CSS))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest(paths.CSS))
    .pipe(browserSync.stream());
}

function javascript() {
  return gulp.src('**/*.js', {sourcemaps: true})
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('dist/'));
}

function watchFiles() {
  gulp.watch(paths.SCSS, css);
  // gulp.watch(paths.ROOT + '**/*{.html|.js}', browserSyncReload);
  htmlWatcher.on('change', browserSyncReload);
  javascriptWatcher.on('change', browserSyncReload);
}


var watch = gulp.parallel(watchFiles, browser);

function clean() {
  return del(paths.DIST);
}

function build() {
  clean();
}

exports.css = css;
exports.javascript = javascript;
exports.watch = watch;
exports.clean = clean;
exports.build = build;