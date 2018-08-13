var webpack = require('webpack');
var merge = require('webpack-merge');
var webpackBase = require('./webpack.base.js');

var JavaScriptObfuscator = require('webpack-obfuscator');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(webpackBase, {
    plugins: [
      new webpack.DefinePlugin({
        DEVMODE: false,
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      })
    ]
});
