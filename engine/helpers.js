const { markdown } = require('markdown')
const truncate = require('html-truncate')

function postUrl(post) {
  return `posts/${post.slug}-${post.id}.html`
}

function excerpt(post, length = 200) {
  return truncate(markdown.toHTML(post.content), length);
}

function formatTimestamp(ts) {
  return new Date(ts).toLocaleDateString()
}

module.exports = { postUrl, excerpt, formatTimestamp }
