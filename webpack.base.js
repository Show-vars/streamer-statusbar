var webpack = require('webpack');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var path = require('path');
var fs = require('fs');
var xml2json = require('xml2json');

//process.traceDeprecation = true;

//var gitrevision = require('child_process').execSync('git rev-parse --short HEAD').toString().trim();

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/js/app.jsx'],
    styles: './src/scss/main.scss'
  },
  output: {
        filename: '[name].js',
        path: path.resolve('./app/build/')
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,

        loader: 'babel-loader',
        query: {
          plugins: ['transform-async-to-generator', 'transform-react-jsx'],
          presets: ['env']
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [{loader: MiniCssExtractPlugin.loader}, "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        include: path.resolve('./app/images/'),
        loader: 'url-loader?limit=10000'
     }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery"
    }),
    new webpack.DefinePlugin({
      //__GIT_REVISION__: JSON.stringify(gitrevision)
    }),
    new MiniCssExtractPlugin({
        filename: "[name].css"
    })
  ]
}
