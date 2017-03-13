const path = require('path');
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/admin/index.html',
  filename: './index.html',
  inject: 'body'
})

const env = process.env.NODE_ENV

const DefinePluginConfig = new webpack.DefinePlugin({
  ENV: {
    awsConfig: 'dev'
  }
})

module.exports = {
  entry: './client/admin/index.js',
  output: {
    path: path.resolve('dist/admin'),
    publicPath: '/admin',
    filename: 'admin_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  devServer: {
    historyApiFallback: {
      index: '/admin/'
    }
  },
  plugins: [HtmlWebpackPluginConfig, DefinePluginConfig]
}