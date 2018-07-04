const webpack = require('webpack')
const config = require('./webpack.admin.config.js');

const DefinePluginConfig = new webpack.DefinePlugin({
  seeblog: {
    frontendUrl: JSON.stringify(process.env.SEEHUND_FRONTEND_URL),
    adminAppClientId: JSON.stringify(process.env.SEEHUND_APP_CLIENT_ID),
    adminUserPoolId: JSON.stringify(process.env.SEEHUND_USER_POOL_ID),
    blogApiUrl: JSON.stringify(process.env.SEEHUND_BLOG_API),
  }
})

config.plugins.push(DefinePluginConfig)

module.exports = config;
