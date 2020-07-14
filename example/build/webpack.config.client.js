const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  context: process.cwd(), //当前正在运行的目录,基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
  target: 'web',
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
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackBar(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
    }),
  ],
  entry: {
    client: './src/client.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].chunk.js',
    libraryTarget: 'var',
  },
  optimization: {},
};
