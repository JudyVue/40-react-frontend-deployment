const merge = require('webpack-merge');
const MiniCssPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const commonConfig = require('./webpack.common');

const webpackProdConfig = {};
webpackProdConfig.module = {};
webpackProdConfig.mode = 'production';

webpackProdConfig.optimization = {
  minimizer: [
    new UglifyJSPlugin(),
  ],
};

webpackProdConfig.plugins = [
  new MiniCssPlugin({
    filename: '[name].[hash].css',
  }),
  new CleanWebpackPlugin(['build']),
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
