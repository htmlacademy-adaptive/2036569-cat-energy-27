import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-squoosh';
import svgo from 'gulp-svgo';
import {deleteAsync} from 'del';

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}


// HTML
const html = () => {
  return gulp.src('source/*html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));
}

// Scripts
const script = () => {
  return gulp.src('source/js/*js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'));
}

// Images
const OptimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'));
}

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/img'));
}

// WebP
const createWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh( {
    webp: {}
  }))
  .pipe(gulp.dest('build/img'));
}

//SVG
const svg = () => {
  return gulp.src('source/img/**/*svg')
  .pipe(svgo())
  .pipe(gulp.dest('build/img'));
}

//Copy

const copy = (done) => {
  gulp.src([
    'source/fonts/**/*.{woff2,woff}',
    'source/*icon'
], {
  base: 'source'
})
  .pipe(gulp.dest('build'))
done();
}

// Clean

const clean = () => {
  return deleteAsync('build')
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
}
// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/js/script.js', gulp.series(script));
  gulp.watch('source/*.html').on('change', browser.reload);
}


// Build

export const build = gulp.series (
  clean,
  copy,
  OptimizeImages,
  gulp.parallel (
    styles,
    html,
    script,
    svg,
    createWebp
  ),
);

// Default

export default gulp.series (
  clean,
  copy,
  copyImages,
  gulp.parallel (
    styles,
    html,
    script,
    svg,
    createWebp
  ),
  gulp.series(
    server,
    watcher
));

