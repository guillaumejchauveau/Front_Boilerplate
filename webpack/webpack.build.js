/**
 * @file Build webpack configuration.
 */

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
 * Base webpack configuration.
 * @type {Object}
 */
const webpackConfig = require('./webpack.base')

webpackConfig.mode = 'production'

webpackConfig.plugins.push(
  new ExtractTextPlugin('css/[name].css'), // Extracts CSS chunks.
  function () {
    this.hooks.emit.tap('build', compilation => {
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
    })
  },
  new OptimizeCssAssetsPlugin({
    cssProcessorOptions: config.optimize.cssnano
  }),
  new ImageminPlugin(config.optimize.imagemin),
  new HtmlMinifierPlugin(config.optimize.htmlminifier, {verbose: true}),
  new ProgressBarPlugin()
)

webpackConfig.module.rules.forEach(rule => {
  // Marks all CSS rules to extract their result.
  if (rule.use && rule.use.includes('css-loader')) {
    rule.use = ExtractTextPlugin.extract({use: rule.use})
  }
  // Fixes the path to url-loaded assets since by default it is relative to the HTML files (now it's relative to the
  // CSS files).
  if (rule.loader && (rule.loader === 'url-loader' || rule.loader === 'file-loader')) {
    rule.query.publicPath = `../`
  }
})

module.exports = webpackConfig
