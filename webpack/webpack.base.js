const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

const config = require('./config')
const root = require('./root')

const postcss = [
  require('autoprefixer')({
                            browsers: config.browsers
                          }),
  require('css-mqpacker')()
]
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
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      },
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
      {
        test: /\.css$/,
        use: loaders.css
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 5000,
          name: 'img/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        query: {
          limit: 5000,
          name: 'font/[name].[ext]'
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.pug$/,
        use: [...loaders.html, 'pug-html-loader?pretty=    ']
      },
      {
        test: /\.html$/,
        use: loaders.html
      }
    ]
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
                                    config.output,
                                    `${root}/node_modules/`,
                                    `${root}/webpack/`
                                  ]),
    new CopyWebpackPlugin([
                            {
                              from: {
                                glob: `${root}/src/static/**/*`,
                                dot: true
                              },
                              to: config.output,
                              context: `${root}/src/static`
                            }
                          ], {
                            ignore: [
                              'empty'
                            ]
                          })
  ],
  devServer: {
    headers: {'Access-Control-Allow-Origin': '*'}
  },
  performance: {
    hints: config.debug ? false : 'warning'
  }
}
