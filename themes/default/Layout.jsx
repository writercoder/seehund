const React = require('react')
const { Helmet } = require('react-helmet')


function Header({blog}) {
  return (
    <header>
      <div className="header-content">
        <h1>{ blog.title }</h1>
      </div>
    </header>
  )
}

function Footer({blog}) {
  return (
    <footer>
      &copy; {new Date().getFullYear()}. Built with <a href="https://seehund.org">Seehund</a>
    </footer>
  )
}

function Layout({children, blog}) {
  return (
    <div>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="/css/normalize.css" />
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
      </Helmet>
      <Header blog={blog} />
      <div className="main-content">
        { children }
      </div>
      <Footer blog={blog} />
    </div>
  )
}

module.exports = Layout
