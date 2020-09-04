var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('minify-css', function() {
    return gulp.src('./css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/css/'))
});

gulp.task('uglify', function() {
    return gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/js/'))
});

gulp.task('minify', gulp.series('minify-css', 'uglify'));
