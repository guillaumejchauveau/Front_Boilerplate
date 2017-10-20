/**
 * @file Configuration variables.
 */

const glob = require('glob')

/**
 * Absolute path to root folder.
 * @type {String}
 */
const root = require('./root')

/**
 * HTML files.
 * @type {Array}
 */
const htmlFiles = glob.sync(`${root}/src/*.@(html|pug)`)

const uglifyjs = {
  compress: {
    warnings: false
  },
  comments: false
}

module.exports = {
  debug: process.env.NODE_ENV === 'development',
  port: 8080,
  historyApiFallback: false,
  entry: {
    index: [`${root}/src/js/index.js`, ...htmlFiles] // Adds HTML files (or equivalent) as entry points.
  },
  output: `${root}/build/`,
  outputPublicPath: './',
  loaders: {
    // sass-loader options.
    sass: {
      includePaths: [
        ...require('bourbon').includePaths, // Bourbon files' path.
        `${root}/src/css`
      ],
      indentWidth: 2,
      outputStyle: 'expanded'
    }
  },
  optimize: {
    cssnano: {
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true
          }
        }
      ]
    },
    htmlminifier: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: uglifyjs,
      processConditionalComments: true,
      quoteCharacter: '"',
      removeComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true
    },
    imagemin: {
      gifsicle: {
        interlaced: true,
        optimizationLevel: 3
      },
      jpegtran: {
        progressive: true
      },
      optipng: {
        optimizationLevel: 5
      }
    },
    uglifyjs
  }
}
