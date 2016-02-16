var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var browserSyncPlugin = require('./browserSync.conf');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: [ /\.less$/, /\.css$/ ],
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'App Title...',
            inject: 'body',
            template: path.resolve(__dirname, './src/index.html')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                APP_ENV: JSON.stringify('browser')
            }
        }),
        browserSyncPlugin,
        new ExtractTextPlugin('bundle.css')
    ]
};
