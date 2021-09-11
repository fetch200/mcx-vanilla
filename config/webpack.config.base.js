const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const packageVersion = require('../package.json').version

module.exports = {
  entry: './src/index.js',
  output: {
    filename: `mcx-ui-vanilla.min-${packageVersion}.js`,
    path: path.resolve(__dirname, '../dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            'presets': ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: 'body'
    }),
  ]
}