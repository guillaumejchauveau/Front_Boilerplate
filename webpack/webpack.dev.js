const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const concat = require('friendly-errors-webpack-plugin/src/utils').concat
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
  new FriendlyErrorsWebpackPlugin({
    clearConsole: false,
    additionalTransformers: [
      function (error) { // Stylelint transformer.
        if (typeof error.webpackError === 'string' && error.webpackError.indexOf('scss') !== -1) {
          return Object.assign({}, error, {
            name: 'Stylelint error',
            type: 'stylelint-error'
          })
        }
        return error
      }
    ],
    additionalFormatters: [ // Stylelint formatter.
      function (errors) {
        const styleLintErrors = errors.filter(e => e.type === 'stylelint-error')
        if (styleLintErrors.length > 0) {
          const flatten = (accum, curr) => accum.concat(curr)
          return concat(
            styleLintErrors
            .map(error => [error.webpackError, ''])
            .reduce(flatten, [])
          )
        }
        return []
      }
    ]
  }),
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
  options: {
    emitWarning: true,
    formatter: require('eslint-formatter-pretty')
  },
  exclude: [/node_modules/]
})

module.exports = webpackConfig
