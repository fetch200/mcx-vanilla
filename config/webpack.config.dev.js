const baseWebpackConfig = require('./webpack.config.base')
const {merge} = require('webpack-merge')

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: [
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
  mode: 'development'
})