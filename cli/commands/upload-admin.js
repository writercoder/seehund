const path = require('path');
const { execFileSync } = require('child_process');

const { loadBlog } = require ('../lib/blog');

const uploadAdmin = async ({blogName, blog}) =>  {

  if(!blog) {
    blog = await loadBlog({name: blogName});
  }

  const args = [
    's3',
    'sync',
    path.resolve(__dirname, `../../dist/${blog.name}`),
    `s3://${blog.adminBucketName}`
  ];

  console.log(execFileSync('aws', args).toString());
}

module.exports = uploadAdmin;
