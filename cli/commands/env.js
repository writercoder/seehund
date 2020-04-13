const { loadBlog } = require('../lib/blog');

const env = ({blogName, region}) => {

  loadBlog({name: blogName, region}, (err, blog) => {
    console.log(`export SEEHUND_BLOG=${blog.name}
export SEEHUND_FRONTEND_URL=${blog.webUrl}
export SEEHUND_WEB_ALIAS=${blog.webAlias}
export SEEHUND_WEB_CDN_DOMAIN=${blog.webCDNDomain}
export SEEHUND_WEB_BUCKET=${blog.webBucketName}
export SEEHUND_USER_POOL_ARN=${blog.adminUserPoolArn}
export SEEHUND_BLOG_API=${blog.blogApiUrl}
export SEEHUND_APP_CLIENT_ID=${blog.adminAppClientId}
export SEEHUND_USER_POOL_ID=${blog.adminUserPoolId}
export SEEHUND_ID_POOL_ID=${blog.adminIdPoolId}`)
  });

};

module.exports = env;
