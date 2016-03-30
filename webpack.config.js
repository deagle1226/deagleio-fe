'use strict'

var path = require('path');
var autoprefixer = require('autoprefixer');
var merge = require('lodash/merge');
var webpack = require('webpack')
var WebpackNotifierPlugin = require('webpack-notifier');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

const PLUGINS = {
    dev: [
        new WebpackNotifierPlugin()
    ],
    prod: [
       new webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('style.css'),
        new webpack.optimize.CommonsChunkPlugin('vendor','vendor.bundle.js')
    ]
}

const LOADERS = {
    dev: [
        {
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015', 'stage-2']
            }
        },
        {
            test: /\.(json)$/,
            loader: 'json-loader'
        },
        {
            test: /\.png$/,
            loader: 'url-loader',
            query: {
                limit: 1024 * 10
            }
        },
        {
            test: /\.(scss|css)$/,
            loader: 'style?singleton!css!postcss!resolve-url!sass?sourceMap'
        },
        {
            test: /\.(woff|woff2)$/,
            loader: 'url-loader',
            query: {
                limit: '99999999',
                mimetype: 'application/font-woff'
            }
        },
        {
            test: /\.(svg)$/,
            exclude: /@ck\/iconography/,
            loader: 'raw-loader'
        },
        {
            test: /.(svg)$/,
            include: /@ck\/iconography/,
            loader: 'babel!svg-react?reactDOM=react'
        }
    ],
    prod: [
        {
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            }
        },
        {
            test: /\.(json)$/,
            loader: 'json-loader'
        },
        {
            test: /\.(woff|woff2)$/,
            loader: 'url-loader',
            query: {
                limit: '99999999',
                mimetype: 'application/font-woff'
            }
        },
        {
            test: /\.(svg)$/,
            exclude: /@ck\/iconography/,
            loader: 'raw-loader'
        },
        {
            test: /.(svg)$/,
            include: /@ck\/iconography/,
            loader: 'babel!svg-react?reactDOM=react'
        },
        {
            test: /\.png$/,
            loader: 'url-loader',
            query: {
                limit: 1024 * 10
            }
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css!postcss')
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css!postcss!resolve-url!sass?sourceMap')
        }
    ]
}

const DIR = path.join(__dirname, './src')

module.exports = {
    entry:[
        'webpack/hot/dev-server',
        path.join(DIR, 'main.jsx')
    ],
    output: {
        publicPath: '/',
        filname: 'bundle.js'
    },
    resolve: {
        root:  __dirname,
        extensions: [ '', '.js', '.jsx', '.json' ],
        alias: {
            components: path.join(DIR, 'components'),
            common: path.join(DIR, 'components/common')
        },
        fallback: DIR
    },
    devtool: 'cheap-source-map',
    devServer: {
        port: 3000,
        hot: true,
        inline: true,
        filename: 'bundle.js',
        contentBase: __dirname,
        historyApiFallback: true,
        stats: {
            chunks: false,
            assets: true,
            hash: false,
            cached: false,
            cachedAssets: false,
            colors: true
        }
    },
    plugins: PLUGINS.dev,
    module: {
        loaders: LOADERS.dev
    },
    postcss: function() {
        return [ autoprefixer ];
    }
}
