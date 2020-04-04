const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/admin/index.html',
  filename: './index.html',
  inject: 'body'
})

module.exports = {
  entry: './client/admin/index.js',
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
      index: '/'
    }
  },
  plugins: [
    HtmlWebpackPluginConfig, 
  ]
}
