const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    disableHostCheck: true,
    progress: true,
    stats: 'errors-only',
    host: '0.0.0.0',
    proxy: {
      '/': {
        target: 'http://10.1.40.123:7799',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    },
  },
  plugins: [new HardSourceWebpackPlugin()],
})
