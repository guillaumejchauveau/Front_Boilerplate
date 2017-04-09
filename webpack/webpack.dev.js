const webpack = require('webpack')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const root = require('./root')
const config = require('./config')
const webpackConfig = require('./webpack.base')

webpackConfig.output.publicPath = `http://localhost:${config.port}/`

for (const key in webpackConfig.entry) {
  if (webpackConfig.entry.hasOwnProperty(key)) {
    webpackConfig.entry[key] = [`${root}/webpack/server-client`, ...webpackConfig.entry[key]]
  }
}

webpackConfig.plugins.push(
  new StyleLintPlugin({
    emitErrors: false
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
)

webpackConfig.module.rules.forEach(rule => {
  if (rule.use && rule.use.includes('css-loader')) {
    rule.use = ['style-loader', ...rule.use]
  }
})
webpackConfig.module.rules.push({
  enforce: 'pre',
  test: /\.js$/,
  loader: 'eslint-loader',
  exclude: [/node_modules/]
})

module.exports = webpackConfig
