const webpack = require('webpack')
const webpackSources = require('webpack-sources')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlMinifierPlugin = require('html-minifier-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const config = require('./config')
const webpackConfig = require('./webpack.base')

webpackConfig.plugins.push(
  new ExtractTextPlugin('css/[name].css'),
  function () { // Has own context.
    this.plugin('emit', (compilation, compileCallback) => {
      let cssChunksLoad = ''
      compilation.chunks.forEach(chunk => {
        cssChunksLoad += `<link rel="stylesheet" type="text/css" href="css/${chunk.name}.css">`
      })

      const assets = compilation.assets
      const htmlAssetNames = []
      for (const assetName in assets) {
        if (assets.hasOwnProperty(assetName) && assetName.match(/\.html$/)) {
          htmlAssetNames.push(assetName)
        }
      }

      htmlAssetNames.forEach(htmlAssetName => {
        const asset = assets[htmlAssetName]
        const processedHtml = asset.source()
                                   .toString()
                                   .replace('<!--CSS-CHUNKS-LOAD-->', cssChunksLoad)
        assets[htmlAssetName] = new webpackSources.RawSource(processedHtml)
      })

      compileCallback()
    })
  },
  new OptimizeCssAssetsPlugin({
    cssProcessorOptions: config.optimize.cssnano
  }),
  new webpack.optimize.UglifyJsPlugin(config.optimize.uglifyjs),
  new ImageminPlugin(config.optimize.imagemin),
  new HtmlMinifierPlugin(config.optimize.htmlminifier),
  new ProgressBarPlugin()
)

webpackConfig.module.rules.forEach(rule => {
  if (rule.use && rule.use.includes('css-loader')) {
    rule.loader = ExtractTextPlugin.extract({use: rule.use})
    delete rule['use']
  }
  if (rule.loader && rule.loader === 'url-loader') {
    rule.query.name = '../' + rule.query.name
  }
})

module.exports = webpackConfig
