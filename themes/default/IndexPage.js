const React = require('react')
const { Helmet } = require('react-helmet')

const Layout = require('./Layout')
const { postUrl, excerpt, formatTimestamp } = require('../../lib/helpers')

function PostListItem({post}) {
  return (
    <article>
      <h2><a href={postUrl(post)}>{post.title}</a></h2>
      <small>{formatTimestamp(post.createdAt)}</small>
      <div dangerouslySetInnerHTML={{__html: excerpt(post)}} />
    </article>
  )
}

function IndexPage({
  posts,
  blog
}) {
  return (
    <Layout blog={blog}>
      <div>
        <Helmet>
          <title>{blog.title}</title>
        </Helmet>
        <div>{posts.map(post => <PostListItem key={post.id} post={post} /> )}</div>
      </div>
    </Layout>
  )
}

module.exports = IndexPage
