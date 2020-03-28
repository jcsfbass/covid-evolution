module.exports = config => {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'client-side-test/helpers/*.js',
            'app/public/js/*.js',
            'client-side-test/spec/*.js'
        ],
        preprocessors: {},
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        restartOnFileChange: true,
        browsers: ['Chrome', 'Firefox', 'SafariPrivate'],
        singleRun: false,
        concurrency: Infinity
    })
};
