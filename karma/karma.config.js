'use strict';

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  var webpackConfig = require('./../config/webpack.test.js');
  var configuration = {
    autoWatch: false,

    basePath: '',

    browsers: ['ChromeHeadless'],

    customLaunchers: {
      ChromeHeadless: {
          base: 'Chrome',
          flags: [
              '--disable-gpu',
              '--headless',
              '--no-sandbox',
              '--remote-debugging-port=9222',
          ],
      },
    },

    colors: true,

    files: [
      { pattern: './karma-test-shim.js', watched: false }
    ],

    frameworks: ['jasmine'],

    logLevel: config.LOG_DEBUG,

    phantomJsLauncher: {
      exitOnResourceError: true
    },

    plugins: [
        'karma-chrome-launcher',
        'karma-coverage',
        'karma-jasmine',
        'karma-remap-coverage',
        'karma-sourcemap-loader',
        'karma-spec-reporter',
        'karma-webpack',
    ],

    port: 9876,

    preprocessors: {
      './karma-test-shim.js': ['coverage', 'webpack', 'sourcemap']
    },

    singleRun: true,

    reporters: ['spec', 'progress', 'coverage', 'remap-coverage'],

    coverageReporter: {
        type: 'in-memory',
    },

    remapCoverageReporter: {
      lcovonly: './coverage/lcov.info',
      html: './coverage/html',
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true  //please don't spam the console when running in karma!
    }
  };

  // Apply configuration
  config.set(configuration);
};
