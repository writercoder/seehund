const path = require('path');
const webpack = require('webpack');

const webpackConfig = require('../../webpack.admin.config.js');
const { loadBlog } = require ('../lib/blog');

const buildAdmin = async ({blog, blogName}) => {

  if(!blog) {
    blog = await loadBlog({name: blogName});
  } else {
    blogName = blog.name;
  }

  const DefinePluginConfig = new webpack.DefinePlugin({
    seeblog: {
      adminAppClientId: JSON.stringify(blog.adminAppClientId),
      adminUserPoolId: JSON.stringify(blog.adminUserPoolId),
      adminIdPoolId: JSON.stringify(blog.adminIdPoolId),
      blogApiUrl: JSON.stringify(blog.blogApiUrl),
      frontendUrl: JSON.stringify(blog.webUrl),
      webAlias: JSON.stringify(blog.webAlias),
      webBucketName: JSON.stringify(blog.webBucketName),
      webCDNDomain: JSON.stringify(blog.webCDNDomain)
    }
  });

  webpackConfig.plugins.push(DefinePluginConfig);

  webpackConfig.output = {
    path: path.resolve(`dist/${blog.name}`),
    publicPath: '/',
    filename: '[name].[contenthash].js'
  }

  const compiler = webpack(webpackConfig);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if(err || stats.hasErrors()) {
        reject(err || stats.toJson().errors)
      } else {
        resolve(stats);
      }
    });
  });
};

module.exports = buildAdmin;
