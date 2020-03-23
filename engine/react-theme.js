const React = require('react')
const ReactDOMServer = require('react-dom/server');
const { Helmet } = require('react-helmet')

const IndexPage = require('../themes/default/IndexPage')
const PostPage = require('../themes/default/PostPage')

function renderPage({helmet, content}) {
  return `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
          ${content}
        </body>
    </html>
  `
}

export function renderIndex(posts, blog) {

  const content = ReactDOMServer.renderToString(
    <IndexPage posts={posts} blog={blog} />
  )

  const helmet = Helmet.renderStatic();

  return renderPage({helmet, content})
}

export function renderPost(post, blog) {

  const content = ReactDOMServer.renderToString(
    <PostPage post={post} blog={blog} />
  )

  const helmet = Helmet.renderStatic();

  return renderPage({helmet, content})
}
