const path = require('path');
const webpack = require('webpack');

const webpackConfig = require('../webpack.admin.config.js');

const buildAdmin = ({
  blogName,
  appClientId,
  userPoolId
}) => {

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
      console.log('Error compiling')
      console.log(err)
    } else {
      console.log('Compilation suceeded')
      console.log(stats.toString())
    }
  })
}

module.exports = buildAdmin;
