const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')
const {merge} = require('webpack-merge')
const packageVersion = require('../package.json').version

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: [
      // {
        // test: /\.(sa|sc|c)ss$/,
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   'css-loader',
        //   {
        //     loader: 'postcss-loader',
        //     options: {
        //       postcssOptions: {
        //         plugins: [
        //           [
        //             'autoprefixer',
        //             {},
        //           ],
        //         ],
        //       },
        //     },
        //   },
        //   'sass-loader',
        // ],
      // }
    ]
  },
  // plugins: [new MiniCssExtractPlugin({
  //   linkType: 'text/css',
  //   filename: `mcx-popupUtil-vanilla.min-${packageVersion}.css`
  // })],
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      // new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
  },
})