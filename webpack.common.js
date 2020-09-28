const resolve = require('path').resolve
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': resolve('./src'),
      '@dashboard': resolve('./src/modules/dashboard'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: resolve('./src'),
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: 'index.html' })],
}
