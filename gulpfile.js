/**
 * Dependencies
 */

// Gulp, plugins, config
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('./package.json').config;

// Non-gulp modules
plugins.browserSync = require('browser-sync');
plugins.sequence = require('run-sequence');
plugins.stream = require('event-stream');

/**
 * Child tasks
 */

function getModule (task) {
	return require(`${config.paths.tasks}/${task}`)(config.paths, gulp, plugins);
}

gulp.task('clean', getModule('clean'));
gulp.task('copy', getModule('copy'));
gulp.task('css', getModule('css'));
gulp.task('css-lint', getModule('css/lint'));
gulp.task('js', getModule('js'));
gulp.task('js-lint', getModule('js/lint'));
gulp.task('img', getModule('img'));
gulp.task('watch', getModule('watch'));
gulp.task('serve', getModule('serve'));

/**
 * Main tasks
 */

// Shared build tasks
gulp.task('build', ['clean'], function (callback) {
	plugins.sequence(['js-lint', 'css-lint'], ['js', 'css', 'img'], callback);
});

// Default tasks
gulp.task('default', function (callback) {
	plugins.sequence('build', 'copy', callback);
});

// Development tasks
gulp.task('dev', function (callback) {
	plugins.sequence('build', 'copy', ['watch', 'serve'], callback);
});
