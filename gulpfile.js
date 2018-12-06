const gulp = require('gulp');
const concat = require('gulp-concat');

const files = [
    './src/sarehub.js',
    './src/sarewebapi.js',
    './src/context_category.js',
    './src/context_product.js',
    './src/context_delivery.js',
    './src/context_runner.js',
    './src/init.js'
];

gulp.task('build', function() {
    return gulp.src(files)
        .pipe(concat('sarehub.js'))
        .pipe(gulp.dest('./dist/'));
});