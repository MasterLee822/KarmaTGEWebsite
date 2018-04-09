var gulp          = require('gulp');
var sass          = require('gulp-sass');
var sourcemaps		= require('gulp-sourcemaps');
var autoprefixer	= require('gulp-autoprefixer');
var browserSync		= require('browser-sync').create();
var notify        = require('gulp-notify');
var plumber       = require('gulp-plumber');


function stripTabs(str) {
	return str.replace(/\t+/g, '');
}


/*====== SASS ======*/

gulp.task('sass-main', function() {

	var onError = function(error, subtitle) {
		notify.onError({
			title: error.relativePath,
			message: stripTabs(error.messageOriginal) + ' [line ' + error.line + ':' + error.column + ']'
		})(error);
		this.emit('end');
	};

  gulp.src('./sass/style.scss')
		.pipe(plumber({errorHandler: onError}))
		.pipe(sourcemaps.init({largeFile: true}))
		.pipe(sass({precision: 10, outputStyle: 'compressed'}))
		.pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
		.pipe(sourcemaps.write('./', {includeContent: false, sourceRoot: '../../sass'}))
		.pipe(gulp.dest('./css'));

});


/*====== BROWSERSYNC ======*/

gulp.task('browser-sync', function() {

	browserSync.init({
		files: [
			'./*.html',
			'./css/style.css',
			'./js/*.js',
			'./img/*.png', './img/*.gif', './img/.jpg'
		],
		proxy: 'localhost/karma',
		online: true,
		notify: false,
    ui: false,
    open: true,
		browser: "Chrome",
		watchOptions: {
			ignoreInitial: true
		}
	});
});


/*====== DEFAULT ======*/

gulp.task('default', ['browser-sync'], function() {
	gulp.watch('./sass/*.scss', ['sass-main']);
});
