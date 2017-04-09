const path = require('path')

module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'tests/**/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
      'tests/**/*.spec.js': ['webpack']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: [/node_modules/]
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: [/node_modules/]
          },
          {
            enforce: 'post',
            test: /\.js$/,
            loader: 'istanbul-instrumenter-loader',
            include: path.resolve('src/js/'),
            exclude: [/node_modules/]
          }
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true,
      stats: {
        colors: true
      }
    },
    reporters: ['mocha', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['clover', 'lcovonly', 'html'],
      'report-config': {
        html: {
          subdir: 'html'
        }
      },
      fixWebpackSourcePaths: true
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  })
}
