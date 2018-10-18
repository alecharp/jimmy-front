const webpackConfig = require('./webpack.config')

module.exports = config => {
  config.set({
    basePath: '.',
    frameworks: ['mocha'],
    files: [
      'test/**/*.spec.js',
    ],
    browsers: ['Chrome', 'Firefox'],
    reporters: ['spec'],
    preprocessors: {
      'test/**/*.spec.js': ['webpack'],
    },
    webpack: webpackConfig('test'),
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-webpack',
      'karma-spec-reporter',
    ],
  })
}
