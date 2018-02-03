'use strict';

const path = require('path');

const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = [
    //
    new webpack.LoaderOptionsPlugin({
        options: {
            context: path.join(__dirname, '..', 'src'),
            output: {
                path: path.join(__dirname, '..', 'dist')
            },
            postcss: [
                autoprefixer
            ]
        }
    }),

    //
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunksSortMode: 'dependency',
        xhtml: true
    }),

    //
    new webpack.optimize.CommonsChunkPlugin({
        name: 'polyfills',
        chunks: ['polyfills']
    }),

    // Enable tree shaking of vendor
    new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['vendor'],
            minChunks: function(module) { return module.context && module.context.indexOf('node_modules') !== -1; }
    }),

    //
    new webpack.optimize.CommonsChunkPlugin({
        name: 'app',
        chunks: ['app']
    }),

    //
    new webpack.optimize.CommonsChunkPlugin({
        name: ['polyfills', 'vendor', 'app'].reverse()
    }),

    //
    new ExtractTextPlugin('[name].[contenthash].css'),

    //
    new CopyWebpackPlugin([
        { from: 'src/mocks/', to: 'mocks/' },  // Mocks
    ], {
        // By default, we only copy modified files during a watch or webpack-dev-server build.
        // Setting this to `true` copies all files.
        copyUnmodified: false
    })
];
