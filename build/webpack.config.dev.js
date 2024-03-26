const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const config = require('../src/config').default

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    clientLogLevel: 'warning',
    hot: true,
    compress: true,
    contentBase: 'dist',
    host: '0.0.0.0',
    port: '8080',
    public: '127.0.0.1:8080',
    open: true,
    overlay: { warnings: false, errors: true },
    quiet: true,
    watchOptions: {
      poll: true,
    },
    proxy: [
      {
        context: ['/graphql', '/pusher/auth', '/api', '/charting_library', '/transifex', '/portal'],
        target: config[config.env].api,
        secure: false,
        changeOrigin: true,
        onProxyReq(proxyReq, req, res) {
          proxyReq.setHeader('Cookie', `_session=${config['_session']};csrfToken=${config.csrfToken}`)
        },
      },
    ],
  },
  devtool: 'eval-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
})
