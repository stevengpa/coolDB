var gulp 		= require('gulp'),
	browserify 	= require('gulp-browserify'),
	uglify		= require('gulp-uglify'),
	rename		= require('gulp-rename');

gulp.task('browserify-cooldb', function() {
	gulp.src('./public/src/cooldb.js')
		.pipe(browserify({ insertGlobals: true }))
		.pipe(rename({ prefix: 'browser-'}))
		.pipe(gulp.dest('./public/dist'))
});

gulp.task('browserify-cooldb-min', function() {
	gulp.src('./public/src/cooldb.js')
		.pipe(browserify({ insertGlobals: true }))
		.pipe(uglify())
		.pipe(rename({ prefix: 'browser-', suffix: '.min'}))
		.pipe(gulp.dest('./public/dist'))
});

gulp.task('cooldb-node', function() {
	gulp.src('./public/src/cooldb.js')
		.pipe(rename({ prefix: 'node-'}))
		.pipe(gulp.dest('./public/dist'))
});

gulp.task('watch', function() {
	gulp.watch('./public/src/cooldb.js', ['browserify-cooldb']);
	gulp.watch('./public/src/cooldb.js', ['browserify-cooldb-min']);
	gulp.watch('./public/src/cooldb.js', ['cooldb-node']);
});

gulp.task('run', ['watch']);