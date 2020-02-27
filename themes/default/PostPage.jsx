const React = require('react')
const { Helmet } = require('react-helmet')
const { markdown } = require('markdown')
const { formatTimestamp } = require('../../engine/helpers')
const Layout = require('./Layout')


function PostPage({
  post,
  blog
}) {
  const html = markdown.toHTML(post.content || '')
  const title = `${post.title} / ${blog.title} `
  return (
    <Layout blog={blog}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <article>
        <h2 className="post-title">{post.title}</h2>
        <small>{formatTimestamp(post.createdAt)}</small>
        <div dangerouslySetInnerHTML={{__html: html}} />
        <p><a href="/">Home page</a></p>
      </article>
    </Layout>
  )
}

module.exports = PostPage
