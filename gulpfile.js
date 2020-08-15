'use strict';

const gulp = require('gulp');
// const uglify = require('gulp-uglify');
// const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const babel = require('babelify');

const paths = {
  src: './www/src/',
  dist: './www/dist/',
  files: ['data-access.js']
}

function compile(watch) {
  paths.files.forEach(function (entryPoint) {
    // bundle option
    const bundler = watchify(
      browserify({
        cache: {}, // watchifyの差分ビルドを有効化
        entries: [paths.src + entryPoint],
        debug: true,
        packageCache: {} // watchifyの差分ビルドを有効化
      }).transform(babel, { presets: ['@babel/preset-env'] })
    );

    // bundle function
    function rebundle() {
      bundler.bundle()
        .on('error', function (err) { console.error(err); this.emit('end'); })
        .pipe(source(entryPoint))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        // .pipe(uglify())
        // .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(paths.dist));
    }

    if (watch) {
      bundler.on('update', function () {
        console.log('-> bundling...');
        rebundle();
      });
    }

    rebundle();
  })
};

function watch() {
  return compile(true);
};

gulp.task('build', function () { return compile(); });
gulp.task('watch', function () { return watch(); });
gulp.task('kill', function () { process.exit(0); });

gulp.task('default', gulp.series(gulp.parallel('watch')));
