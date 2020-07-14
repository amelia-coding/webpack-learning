const path = require('path');
const ConsoleLogOnBuildWebpackPlugin = require('./plugin/ConsoleLogOnBuildWebpackPlugin');
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: path.resolve('./loader/babel-index.js'),
          options: {
            data: ['自定义选项'],
          },
        },
      },
    ],
  },
  plugins: [new ConsoleLogOnBuildWebpackPlugin()],
  optimization: {
    // chunkIds: 'natural',
    // moduleIds: 'natural'
  },
};
