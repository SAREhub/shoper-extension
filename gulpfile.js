const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const files = [
    './src/sarehub.js',
    './src/sarewebapi.js',
    './src/storage.js',
    './src/context_cart.js',
    './src/context_category.js',
    './src/context_product.js',
    './src/context_confirm.js',
    './src/context_delivery_payment.js',
    './src/context_purchased.js',
    './src/context_registration.js',
    './src/context_runner.js',
    './src/init.js'
];

gulp.task('build', function() {
    return gulp.src(files)
        .pipe(concat('sarehub.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});