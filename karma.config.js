const path = require('path');

module.exports = (config) => {
    config.set({
        basePath: path.resolve(''),
        frameworks: ['jasmine'],
        files: [
            'dist/sarehub.js',
            'src/*.spec.js',
        ],
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity,
    });
};