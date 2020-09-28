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
  },
  plugins: [new HardSourceWebpackPlugin()],
})
