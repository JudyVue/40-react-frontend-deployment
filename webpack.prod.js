const merge = require('webpack-merge');
const MiniCssPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglify-js-plugin');
const commonConfig = require('./webpack.common');

const webpackProdConfig = {};
webpackProdConfig.module = {};
webpackProdConfig.mode = 'production';


webpackProdConfig.plugins = [
  new MiniCssPlugin({
    filename: '[name].[hash].css',
  }),
  new CleanWebpackPlugin(['build']),
  new UglifyJSPlugin({
    uglifyOptions: {
      compress: {
        drop_console: true,
      },
      output: {
        comments: false,
      },
    },
  }),
];

webpackProdConfig.module.rules = [
  {
    test: /\.scss$/,
    use: [
      MiniCssPlugin.loader,
      'css-loader',
      'sass-loader',
    ],
  },
];

module.exports = merge(commonConfig, webpackProdConfig);
