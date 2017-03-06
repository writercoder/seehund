const path = require('path');
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/admin/index.html',
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
  entry: './src/admin/index.js',
  output: {
    path: path.resolve('dist/admin'),
    filename: 'admin_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [HtmlWebpackPluginConfig, DefinePluginConfig]
}