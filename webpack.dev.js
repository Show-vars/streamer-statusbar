var webpack = require('webpack');
var merge = require('webpack-merge');
var webpackBase = require('./webpack.base.js');

module.exports = merge(webpackBase, {
    plugins: [
      new webpack.DefinePlugin({
        DEVMODE: true
      })
    ]
});
