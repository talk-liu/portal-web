const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const postcssSafeParser = require('postcss-safe-parser')
const utils = require('./utils')
const config = require('./portal.config')

module.exports = merge.smart(baseConfig, {
  mode: 'production',
  output: {
    filename: utils.assetsPath('js/[name]-[git-revision-hash].js'),
    publicPath: config.assetsPublicPath,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_console: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: postcssSafeParser,
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            query: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
            },
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./src/assets/scss/variable.scss', './src/assets/scss/mixins/responsive-visibility.scss'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new GitRevisionPlugin(),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name]-[git-revision-hash].css'),
    }),
    new CleanWebpackPlugin([utils.resolve('/dist/static/*')], {
      root: utils.resolve('/'),
    }),
  ],
})
