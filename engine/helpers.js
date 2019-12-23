
function postUrl(post) {
  return `posts/${post.slug}-${post.id}.html`
}

module.exports = { postUrl }
