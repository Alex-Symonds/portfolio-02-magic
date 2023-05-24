// Build file bundling JavaScript, applying Babel/JSX transpiling (when needed) and uglifying.
var concat = require('gulp-concat');
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const { watch } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const sass = require('gulp-dart-sass');

const PATH_SCSS_FILES = 'dev/scss';
const PATH_DIST_CSS = 'dist/static/styles';

const PATH_JS_FILES = 'dev/scripts';
const PATH_DIST_JS = 'dist/static/scripts';

function cssMain(){
  return gulp.src([
    `${PATH_SCSS_FILES}/variables.scss`,
    `${PATH_SCSS_FILES}/main.scss`,
    `${PATH_SCSS_FILES}/*.scss`,
  ])
  .pipe(concat('custom.scss'))
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCSS())
  .pipe(rename('styles.css'))
  .pipe(gulp.dest(PATH_DIST_CSS));
}

function cssMonsters(){
  return css('dist/monsters/static/css', 'dist/monsters/static/styles');
}

function cssDoodles(){
  return css('dist/doodles/static/css', 'dist/doodles/static/styles');
}

function css(SRC_PATH, DST_PATH){
  return gulp.src([`${SRC_PATH}/*.css`])
  .pipe(cleanCSS())
  .pipe(gulp.dest(DST_PATH));
}

function jsMain() {
  return gulp.src([`${PATH_JS_FILES}/*.js`])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(PATH_DIST_JS));
}

exports.default = function(){
    watch('dev/scss/*.scss', cssMain);
    watch('dev/scripts/*js', jsMain);
    watch('dist/monsters/static/css', cssMonsters);
    watch('dist/doodles/static/css', cssDoodles);
};