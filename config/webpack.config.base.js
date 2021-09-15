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
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: path.resolve(__dirname, '../public/index.html'),
  //     inject: 'body'
  //   }),
  // ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'..src')
    }
  }
}