
const { markdown } = require('markdown')
const { postUrl } = require('./helpers')

const page = (blog, content) => {
  return `
    <head>
      <title>${blog.title}</title>
    </head>
    <body>
      ${content}
    </body>
  `;
}

function renderPost(post, blog) {
  const html = markdown.toHTML(post.content || '')
  return page(blog, `
    <h1>${post.title}</h1>
    <div>${html}</div>
  `);
}

const postListing = (post) => {
  return `<p><a href="${postUrl(post)}">${post.title}</a></p>`;
}

function renderIndexPage(posts, blog) {
  const postList = posts.map(postListing).join("")
  return page(blog, `
    <h1>${blog.title}</h1>
    <div>${postList}</div>
  `);
}

module.exports = { renderPost, page, renderIndexPage }
