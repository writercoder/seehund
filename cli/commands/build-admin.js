const path = require('path');
const webpack = require('webpack');

const webpackConfig = require('../../webpack.admin.config.js');

const buildAdmin = (blog, callback) => {
  const DefinePluginConfig = new webpack.DefinePlugin({
    seeblog: {
      adminAppClientId: JSON.stringify(blog.adminAppClientId),
      adminUserPoolId: JSON.stringify(blog.adminUserPoolId),
      blogApiUrl: JSON.stringify(blog.blogApiUrl),
      frontendUrl: JSON.stringify(blog.webUrl)
    }
  });


  webpackConfig.plugins.push(DefinePluginConfig);

  webpackConfig.output = {
    path: path.resolve(`dist/${blog.name}/admin`),
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
  });
};


module.exports = buildAdminNew;
