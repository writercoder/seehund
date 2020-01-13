const path = require('path');
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/admin/index.html',
  filename: './index.html',
  inject: 'body'
})


module.exports = {
  entry: './client/admin/index.js',
  output: {
    path: path.resolve('dist/dev/admin'),
    publicPath: '/admin',
    filename: 'admin_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader', options: {
              includePaths: ['./node_modules', './node_modules/grommet/node_modules']
            }
          }
        ]
      },
    ]
  },
  devServer: {
    historyApiFallback: {
      index: '/admin/'
    }
  },
  plugins: [HtmlWebpackPluginConfig, new webpack.SourceMapDevToolPlugin]
}
