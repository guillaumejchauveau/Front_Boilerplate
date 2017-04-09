const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const config = require('./config')
const webpackConfig = require('./webpack.dev')

webpackConfig.plugins.push(function () { // Has own context.
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
