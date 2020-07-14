/*
 * @Author: your name
 * @Date: 2020-06-29 13:05:00
 * @LastEditTime: 2020-06-29 13:43:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-learning\build-node\webpack.config.server.js
 */

const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const RemoveAssetsPlugin = require('./plugin/remove-assets-plugin');

module.exports = {
  target: 'node',
  mode: 'development',
  context: process.cwd(), //当前正在运行的目录,基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
  target: 'node',
  devtool: 'cheap-module',
  resolve: {},
  resolveLoader: {},
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,//
          {
            loader: 'css-loader',
            options: {
              localsConvention: 'camelCase',
              modules: {
                localIdentName: '[local]--[hash:base64:6]',
              },
            },
          },
        ],
        // use: ['ignore-loader'],
      },
    ],
  },
  plugins: [
    new WebpackBar(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
    }),
    new RemoveAssetsPlugin(),
    new CleanWebpackPlugin(),
  ],
  entry: {
    server: './src/server.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/',
  },
  externals: [
    nodeExternals({
      //node端的第三方模块node_modules不打包，直接通过require方式获取
      whitelist: [/\.css$/], // 不设置的话，require("antd/dist/antd.css") 服务端会不识别css，忽略css，让webpack打包处理
    }),
  ],
  optimization: {},
};
