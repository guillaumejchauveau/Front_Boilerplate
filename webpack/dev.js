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
 * Webpack development configuration.
 * @type {Object}
 */
const webpackConfig = require('./webpack.dev')

// Reloads browser if updated file is HTML.
webpackConfig.plugins.push(function () { // Plugins need their own context.
  this.plugin('after-emit', (compilation, compileCallback) => {
    for (const assetName in compilation.assets) {
      if (compilation.assets.hasOwnProperty(assetName) &&
        assetName.match(/\.html$/) &&
        compilation.assets[assetName].emitted) {
        hotMiddleware.publish({action: 'reload'})
      }
    }

    compileCallback()
  })
})
const compiler = webpack(webpackConfig)
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => { /* No-op block */ }
})

// Webpack server is used for development.
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

server.listen(config.port, err => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`Listening on ${config.port}`)
})
