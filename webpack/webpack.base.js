const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack           = require('webpack')
const config            = require('./config')

const root    = require('./root')
const postcss = [
    require('autoprefixer')({
                                browsers: config.browsers
                            }),
    require('css-mqpacker')()
]
const loaders = {
    html: [
        `file-loader?context=${root}/src&name=[path][name].html`,
        `extract-loader?publicPath=${config.outputPublicPath}`
    ],
    css : [
        'css-loader',
        'postcss-loader'
    ]
}

module.exports = {
    entry      : config.entry,
    output     : {
        path      : config.output,
        filename  : 'js/[name].js',
        publicPath: config.outputPublicPath
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
                loaders: [...loaders.css, 'sass-loader']
            },
            {
                test   : /\.css$/,
                loaders: loaders.css
            },
            {
                test  : /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                query : {
                    limit: 5000,
                    name : 'img/[name].[ext]'
                }
            },
            {
                test  : /\.(woff2?|eot|ttf|otf)$/,
                loader: 'url-loader',
                query : {
                    limit: 5000,
                    name : 'font/[name].[ext]'
                }
            },
            {
                test  : /\.json$/,
                loader: 'json-loader'
            },
            {
                test   : /\.pug$/,
                loaders: [...loaders.html, 'pug-html-loader?pretty=    ']
            },
            {
                test   : /\.html$/,
                loaders: [...loaders.html, 'html-loader']
            }
        ]
    },
    plugins    : [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss,
                sassLoader: config.loaders.sass
            }
        }),
        new webpack.WatchIgnorePlugin([
            config.output,
            `${root}/node_modules/`,
            `${root}/webpack/`
        ]),
        new CopyWebpackPlugin([
            {
                from   : {
                    glob: `${root}/src/static/**/*`,
                    dot : true
                },
                to     : config.output,
                context: `${root}/src/static`
            }
        ], {
            ignore: [
                'empty'
            ]
        })
    ],
    devServer  : {
        headers: {'Access-Control-Allow-Origin': '*'}
    },
    performance: {
        hints: config.debug ? false : 'warning'
    }
}
