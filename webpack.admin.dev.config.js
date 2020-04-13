const webpack = require('webpack')
const config = require('./webpack.admin.config.js');

const DefinePluginConfig = new webpack.DefinePlugin({
  seeblog: {
    frontendUrl: JSON.stringify(process.env.SEEHUND_FRONTEND_URL),
    webAlias: JSON.stringify(process.env.SEEHUND_WEB_ALIAS),
    webCDNDomain: JSON.stringify(process.env.SEEHUND_WEB_CDN_DOMAIN),
    adminAppClientId: JSON.stringify(process.env.SEEHUND_APP_CLIENT_ID),
    adminUserPoolId: JSON.stringify(process.env.SEEHUND_USER_POOL_ID),
    adminIdPoolId: JSON.stringify(process.env.SEEHUND_ID_POOL_ID),
    blogApiUrl: JSON.stringify(process.env.SEEHUND_BLOG_API),
    webBucketName: JSON.stringify(process.env.SEEHUND_WEB_BUCKET),
    awsRegion: JSON.stringify(process.env.AWS_REGION || 'us-east-1'),
  }
})

config.plugins.push(DefinePluginConfig)

module.exports = config;
