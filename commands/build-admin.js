
const webpack = require('webpack');

const webpackConfig = require('../webpack.admin.config.js');

const buildAdmin = ({
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
