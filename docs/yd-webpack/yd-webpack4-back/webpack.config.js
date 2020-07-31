const glob = require('glob');
const path = require('path');
// const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const threadLoader = require('thread-loader');
const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const notifier = require('node-notifier');
const setTitle = require('node-bash-title');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
setTitle('🍻 这是生产配置');
// threadLoader.warmup({
//     workers: 3,
// }, [
//     MiniCssExtractPlugin.loader,
//     'css-loader',
// ]);
module.exports = smp.wrap({
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'cache-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          'css-loader',
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
      },
    ],
  },
  optimization: {
    // minimize: true,
    // minimizer: [new TerserPlugin({
    //     test: /\.js(\?.*)?$/i,
    //     cache: true,
    //     parallel: true,
    // })],
  },
  plugins: [
    // new WebpackDeepScopeAnalysisPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: 'test.html',
      template: 'src/index.html',
    }),
    new HardSourceWebpackPlugin(),
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, 'src/*.html')),
    }),
    new ProgressBarPlugin(),
    new WebpackBuildNotifierPlugin({
      title: '🌶 老袁的Webpack',
      logo: path.resolve('./img/favicon.png'),
      suppressSuccess: true,
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:3000'],
        notes: ['Some additionnal notes to be displayed unpon successful compilation'],
      },
      onErrors: function (severity, errors) {
        // console.log("🐻",errors)
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: '🌶 老袁的Webpack',
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
          // icon: ICON
        });
      },
      // should the console be cleared between each compilation?
      // default is true
      clearConsole: true,
    }),
    // new PrepackWebpackPlugin()
    new BundleAnalyzerPlugin(),
  ],
});
