/**
 * @file Base webpack configuration.
 */

const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

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
 * PostCSS plugins.
 * @type {Array}
 */
const postcss = [
  require('autoprefixer')(),
  require('css-mqpacker')()
]
/**
 * Common loaders.
 * @type {Object}
 */
const loaders = {
  html: [
    `file-loader?context=${root}/src&name=[path][name].html`,
    `extract-loader?publicPath=${config.outputPublicPath}`,
    'html-loader'
  ],
  css: [
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => postcss
      }
    }
  ]
}

module.exports = {
  entry: config.entry,
  output: {
    path: config.output,
    filename: 'js/[name].js',
    publicPath: config.outputPublicPath
  },
  module: {
    rules: [
      // JS
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      },
      // SCSS
      {
        test: /\.scss$/,
        use: [
          ...loaders.css,
          {
            loader: 'sass-loader',
            options: config.loaders.sass
          }
        ]
      },
      // CSS
      {
        test: /\.css$/,
        use: loaders.css
      },
      // Images
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 5000,
          name: 'img/[name].[ext]'
        }
      },
      // Fonts
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        query: {
          limit: 5000,
          name: 'font/[name].[ext]'
        }
      },
      // JSON
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      // PUG
      {
        test: /\.pug$/,
        use: [
          ...loaders.html,
          {
            loader: 'pug-html-loader',
            options: {
              pretty: '  '
            }
          }
        ]
      },
      // HTML
      {
        test: /\.html$/,
        use: loaders.html
      }
    ]
  },
  plugins: [
    // Ignore output, packages, webpack files.
    new webpack.WatchIgnorePlugin([
      config.output,
      `${root}/node_modules/`,
      `${root}/webpack/`
    ]),
    new CopyWebpackPlugin(
      [
        // Static files copy.
        {
          from: {
            glob: `${root}/src/static/**/*`,
            dot: true
          },
          to: config.output,
          context: `${root}/src/static`
        }
      ],
      {
        ignore: [
          'empty' // Ignore placeholder files.
        ]
      })
  ],
  performance: {
    hints: config.debug ? false : 'warning'
  }
}
