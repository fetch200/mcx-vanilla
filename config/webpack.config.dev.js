const baseWebpackConfig = require('./webpack.config.base')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {merge} = require('webpack-merge')

module.exports = merge(baseWebpackConfig, {
  mode: 'development'
})