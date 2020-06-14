const { loadBlog } = require("../lib/blog");
const open = require("open");

const openAdmin = async ({ blogName, region }) => {
  const blog = await loadBlog({ name: blogName, region });
  await open(blog.adminUrl);
};

module.exports = openAdmin;
