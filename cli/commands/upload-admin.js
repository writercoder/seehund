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
    '--exclude',
    'index.html',
    path.resolve(__dirname, `../../dist/${blog.name}`),
    `s3://${blog.adminBucketName}`,
  ];

  console.log(execFileSync('aws', args).toString());

  const putIndexArgs = [
    's3',
    'cp',
    path.resolve(__dirname, `../../dist/${blog.name}/index.html`),
    `s3://${blog.adminBucketName}/index.html`,
    '--cache-control',
    'max-age=60',
  ]

  console.log(execFileSync('aws', putIndexArgs).toString());
}

module.exports = uploadAdmin;
