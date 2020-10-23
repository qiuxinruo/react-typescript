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
    host: 'bix1.jituancaiyun.net',
    proxy: {
      '/': {
        target: 'http://bix.jituancaiyun.net',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    },
  },
  plugins: [new HardSourceWebpackPlugin()],
})
