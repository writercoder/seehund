const { loadBlog } = require('../lib/blog');


const showStack = ({blogName, region}) => {

  loadBlog({name: blogName, region}, (err, blog) => {
    if(err) return console.log(err);
    console.log(blog.config())
  });

};

module.exports = showStack;
