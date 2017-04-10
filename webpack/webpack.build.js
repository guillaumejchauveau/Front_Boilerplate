const webpack = require('webpack')
const webpackSources = require('webpack-sources')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlMinifierPlugin = require('html-minifier-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

/**
 * Configuration variables.
 * @type {Object}
 */
const config = require('./config')
/**
 * Absolute path to root folder.
 * @type {String}
 */
const root = require('./root')
/**
 * Base webpack configuration.
 * @type {Object}
 */
const webpackConfig = require('./webpack.base')

webpackConfig.plugins.push(
  new ExtractTextPlugin('css/[name].css'), // Extracts CSS chunks.
  function () { // Plugins need their own context.
    this.plugin('emit', (compilation, compileCallback) => {
      // Generates CSS load code for each extracted CSS chunks.
      let cssChunksLoad = ''
      compilation.chunks.forEach(chunk => {
        cssChunksLoad += `<link rel="stylesheet" type="text/css" href="css/${chunk.name}.css">`
      })

      // Looks for HTML assets.
      const assets = compilation.assets
      const htmlAssetNames = []
      for (const assetName in assets) {
        if (assets.hasOwnProperty(assetName) && assetName.match(/\.html$/)) {
          htmlAssetNames.push(assetName)
        }
      }

      // Adds CSS load code to each HTML assets.
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
  // Marks all CSS rules to extract their result.
  if (rule.use && rule.use.includes('css-loader')) {
    rule.loader = ExtractTextPlugin.extract({use: rule.use})
    delete rule['use']
  }
  // Fixes the path to url-loaded assets since by default it is relative to the HTML files (now it's relative to the
  // CSS files).
  if (rule.loader && rule.loader === 'url-loader') {
    rule.query.publicPath = `../`
  }
})

module.exports = webpackConfig
