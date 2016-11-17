"use strict"

const webpack               = require('webpack');
const path                  = require("path");
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: './bin',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.jsx|\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ["transform-react-jsx"]
                }
            },
            {
                test: /\.html?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'file-loader'
            },
            {
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract("style", "css!sass")
            },
            { 
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            { 
                test: /\.(json)$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //  compress: {
        //      warnings: false,
        //  },
        //  output: {
        //      comments: false
        //  }
        // }),
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            inject: false
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new ExtractTextPlugin("[name].css")
    ],
    resolve: {
        extensions: ["", ".js", ".jsx", ".json"],
        alias: {
            "components": path.resolve(__dirname, "./src/js/components"),
            "resources": path.resolve(__dirname, "./resources")
        }
    }
};
