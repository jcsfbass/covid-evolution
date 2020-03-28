process.env.CHROME_BIN = require('puppeteer').executablePath();

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
        autoWatch: false,
        restartOnFileChange: false,
        browsers: ['ChromeHeadless'],
        singleRun: true,
        concurrency: Infinity
    })
};
