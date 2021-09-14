const baseWebpackConfig = require('./webpack.config.base')
const {merge} = require('webpack-merge')

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: [

    ]
  },
  mode: 'development'
})