const path = require('path');
const webpack = require('webpack');

const webpackConfig = require('../webpack.admin.config.js');

const buildAdmin = ({
  blogName,
  appClientId,
  userPoolId
}, callback) => {

  const DefinePluginConfig = new webpack.DefinePlugin({
    seeblog: {
      adminAppClientId: JSON.stringify(appClientId),
      adminUserPoolId: JSON.stringify(userPoolId)
    }
  });

  webpackConfig.plugins.push(DefinePluginConfig);

  webpackConfig.output = {
    path: path.resolve(`dist/${blogName}/admin`),
    publicPath: '/admin',
    filename: 'admin_bundle.js'
  }

  const compiler = webpack(webpackConfig);

  compiler.run((err, stats) => {
    if(err || stats.hasErrors()) {
      callback(err)
    } else {
      callback(null, stats)
    }
  })
}

module.exports = buildAdmin;
