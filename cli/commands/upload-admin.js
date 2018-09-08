const path = require('path');
const { execFileSync } = require('child_process');

const { loadBlog } = require ('../lib/blog');

const uploadAdmin = async ({blogName, blog}) =>  {

  if(!blog) {
    blog = await loadBlog({blogName});
  }

  const bucketName = blog.webBucketName;

  const args = [
    's3',
    'sync',
    path.resolve(__dirname, `../../dist/${blog.name}`),
    `s3://${bucketName}`
  ];

  console.log(execFileSync('aws', args).toString());
}

module.exports = uploadAdmin;
