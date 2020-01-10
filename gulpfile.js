const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');

// const isDev = (process.argv.indexOf('--dev') !== -1);
// const isProd = !isDev;
// const isSync = (process.argv.indexOf('--sync') !== -1);
const isDev = true;
const isProd =false;
const isSync = true;



/*
	1. browserSync для html
	2. 
		gulp-uncss - удаление неиспользуемого css
		gulp-group-css-media-queries - соединение media-запрос
	3. по желанию pug html препроц
*/

let scssFiles = [
	'./node_modules/normalize.css/normalize.css',
	'./src/scss/common.scss',
	'./src/scss/main-menu.scss',
	'./src/scss/overview.scss',
	'./src/scss/features.scss',
	'./src/scss/wicked.scss',
	'./src/scss/heading.scss',
	'./src/scss/experience.scss',
	'./src/scss/photography.scss',
	'./src/scss/get-in-touch.scss'
];

function clear(){
	return del('build/*');
}

function styles(){
	return gulp.src(scssFiles)
			.pipe(gulpif(isDev, sourcemaps.init()))
			.pipe(concat('style.scss'))
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer({
				cascade: false
			}))
			.pipe(gulpif(isProd, cleanCSS({
				level: 2
			})))
			.pipe(gulpif(isDev, sourcemaps.write()))
			.pipe(gulp.dest('./build/css'))
			.pipe(gulpif(isSync, browserSync.stream()));
}

function img(){
	return gulp.src('./src/img/**/*')
			.pipe(gulp.dest('./build/img'));
}

function html(){
	return gulp.src('./src/*.html')
			.pipe(gulp.dest('./build'));
}

function watch(){
	if(isSync){
			browserSync.init({
			server: {
				baseDir: "./",
			}
		});
	}
	gulp.watch('./src/scss/**/*.scss', styles);
}

let build = gulp.series(clear, 
	gulp.parallel(styles, img, html)
);

gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));