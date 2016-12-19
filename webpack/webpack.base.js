const webpack = require('webpack')
const config  = require('./config')

const root = require('./root')

module.exports = {
    entry      : config.entry,
    output     : {
        path      : config.output,
        filename  : '[name].js',
        publicPath: config.outputPublicPath
    },
    resolve    : {
        extensions: ['.css', '.scss', '.js', '.json']
    },
    module     : {
        rules: [
            {
                test   : /\.js$/,
                loader : 'babel-loader',
                exclude: [/node_modules/]
            },
            {
                test   : /\.scss$/,
                loaders: ['css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test   : /\.css$/,
                loaders: ['css-loader', 'postcss-loader']
            },
            {
                test  : /\.(png|jpg|gif|svg|woff2?|eot|ttf|otf)$/,
                loader: 'url-loader',
                query : {
                    limit: 1000,
                    name : '[name].[ext]'
                }
            },
            {
                test  : /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins    : [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss   : [
                    require('autoprefixer')({
                                                browsers: config.browsers
                                            }),
                    require('css-mqpacker')()
                ],
                sassLoader: {
                    includePaths: config.sassIncludePaths,
                    indentWidth : 4,
                    outputStyle : 'expanded'
                }
            }
        }),
        new webpack.WatchIgnorePlugin([
            `${root}/build/`,
            `${root}/node_modules/`,
            `${root}/webpack/`
        ])
    ],
    devServer  : {
        headers: {"Access-Control-Allow-Origin": "*"}
    },
    performance: {
        hints: config.debug ? false : 'warning'
    }
}