const { loadBlog } = require('../lib/blog');



const env = ({blogName, region}) => {

  loadBlog({name: blogName, region}, (err, blog) => {
    console.log(`SEEHUND_BLOG=${blog.name}
SEEHUND_WEB_BUCKET=${blog.webBucketName}
SEEHUND_USER_POOL_ARN=${blog.adminUserPoolArn}`)
  });

};

module.exports = env;
