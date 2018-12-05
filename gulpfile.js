const fs = require('fs');
const gulp = require('gulp');
const concat = require('gulp-concat');
const info = JSON.parse(fs.readFileSync('package.json'));

const files = [
    './src/sarehub.js',
    './src/sarewebapi.js',
    './src/context_category.js',
    './src/context_runner.js',
    './src/init.js'
];

gulp.task('build', function() {
    return gulp.src(files)
        .pipe(concat('sarehub-' + info.version + '.js'))
        .pipe(gulp.dest('./dist/'));
});