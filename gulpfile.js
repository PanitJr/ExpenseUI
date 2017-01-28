var gulp = require('gulp');
var isVerbose = process.argv.some(function (arg) {
  return arg === '-v' || arg === '--verbose';
});
require('gulp-grunt')(gulp, { verbose: isVerbose });

gulp.task('default', ['basecss']);