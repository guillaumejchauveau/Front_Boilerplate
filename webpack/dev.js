/**
 * @file Dev script.
 */

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

/**
 * Configuration variables.
 * @type {Object}
 */
const config = require('./config')
/**
 * Development webpack configuration.
 * @type {Object}
 */
const webpackConfig = require('./webpack.dev')

// Reloads browser if updated file is HTML.
webpackConfig.plugins.push(function () {
  this.hooks.afterEmit.tap('HTMLReload', (compilation) => {
    for (const assetName in compilation.assets) {
      if (compilation.assets.hasOwnProperty(assetName) &&
        assetName.match(/\.html$/) &&
        compilation.assets[assetName].emitted) {
        hotMiddleware.publish({action: 'reload'})
      }
    }
  })
})

const compiler = webpack(webpackConfig)
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => { /* No-op block */ }
})

const server = new WebpackDevServer(compiler, {
  contentBase: config.output,
  hot: true,
  historyApiFallback: config.historyApiFallback,
  quiet: true,
  noInfo: false,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

server.use(hotMiddleware)

server.listen(config.port, 'localhost', err => {
  if (err) {
    throw err
  }

  process.stdout.write(`Listening on ${config.port} \n\n`)
})
