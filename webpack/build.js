/**
 * @file Build script.
 */

const webpack = require('webpack')

/**
 * Build webpack configuration.
 * @type {Object}
 */
const webpackConfig = require('./webpack.build')

webpack(webpackConfig, (err, stats) => {
  if (err) {
    throw err
  }

  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
})
