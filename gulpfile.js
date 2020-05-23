const gulp = require('gulp');
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const template = require('gulp-template');
const environments = require('gulp-environments');
const templateCache = require('gulp-angular-templatecache');
const uuidv1 = require('uuid/v1');
const source = require('./source');
const del = require('del');

const production = environments.production;
const uuid = production() ? '_' + uuidv1() : '';
let jsFileName = `incosa${uuid}.js`,
  cssFileName = `incosa${uuid}.css`,
  templateFileName = `incosa_templates${uuid}.js`;

gulp.task('sass', () =>
  gulp
    .src(source.styles)
    .pipe(sass())
    .pipe(production(cssnano()))
    .pipe(concat(cssFileName))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
);

gulp.task('js', () =>
  gulp
    .src(source.scripts)
    .pipe(concat(jsFileName))
    .pipe(production(uglify({ ie8: true })))
    .pipe(gulp.dest('./dist/js'))
);

gulp.task('html', () => {
  gulp
    .src(source.views.src)
    .pipe(
      production(htmlmin({ collapseWhitespace: true, removeComments: true }))
    )
    .pipe(gulp.dest('./dist/'));

  gulp.src(source.views.utils).pipe(gulp.dest('./dist/templates'));

  return gulp
    .src(source.views.app)
    .pipe(
      production(htmlmin({ collapseWhitespace: true, removeComments: true }))
    )
    .pipe(rename({ dirname: '' }))
    .pipe(
      templateCache({
        module: 'incosa',
        standalone: false,
        root: 'partials/',
        filename: templateFileName
      })
    )
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('inject', () =>
  gulp
    .src('./dist/index.html')
    .pipe(
      template({
        js: `./js/${jsFileName}`,
        template: `./js/${templateFileName}`,
        css: `./css/${cssFileName}`
      })
    )
    .pipe(gulp.dest('dist'))
);

gulp.task('assets', () =>
  gulp.src(source.assets).pipe(gulp.dest('./dist/assets'))
);

gulp.task('clean', () => del('./dist/**/*'));

gulp.task(
  'build',
  gulp.series(['clean', 'html', 'sass', 'js', 'assets', 'inject']),
  () => {}
);

gulp.task('browser-sync', () => {
  browserSync.init({
    open: false,
    watch: true,
    https: false,
    cors: true,
    server: {
      baseDir: './dist'
    }
  });

  gulp.watch('./src/**/*.scss', gulp.series('sass'));
  gulp.watch('./src/**/*.js', gulp.series('js'));
  gulp.watch('./src/**/*.html', gulp.series(['html', 'inject']));
});

gulp.task('serve', gulp.series(['build', 'browser-sync']), () => {});
