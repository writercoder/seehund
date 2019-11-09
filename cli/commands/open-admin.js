const { execFileSync } = require('child_process');
const { loadBlog } = require('../lib/blog');

const openAdmin = async ({blogName, region}) => {
  const blog = await loadBlog({name: blogName, region});

  execFileSync('open', [blog.adminUrl]);
}

module.exports = openAdmin;
