const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  performance: {
    hints: false,
  },
  optimization: {
    moduleIds: 'hashed',
    splitChunks: {
      minSize: 50 * 1024,
      maxSize: 1204 * 1024,
    },
  },
  plugins: [new CleanWebpackPlugin()],
})
