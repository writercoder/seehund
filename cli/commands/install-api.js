const path = require('path');
const { execFileSync } = require('child_process');
const { loadBlog } = require('../lib/blog');

const doInstallApi = ({blogName, region, webBucketName}, callback) => {

  const serverlessBin = path.join(
    __dirname, '../../node_modules/serverless/bin/serverless')

  const args = ['deploy', '--region', region];
  const env = Object.assign(
    {},
    process.env,
    { SEEHUND_BLOG: blogName, SEEHUND_WEB_BUCKET: webBucketName })

  console.log(execFileSync(serverlessBin, args, { env }).toString());
  callback(null);
};


const installApi = ({blogName, blog, region}, callback) => {
  if(!!blog) {
    doInstallApi({
      blogName: blog.name,
      webBucketName: blog.webBucketName,
      region: blog.region }, callback)
  } else {
    loadBlog({blogName, region}, (err, blog) => {
      if(err) return callback(err);
      doInstallApi({
        blogName: blog.name,
        webBucketName: blog.webBucketName,
        region }, callback)
    })
  }
}

module.exports = installApi;
