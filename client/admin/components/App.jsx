import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import DevTools from 'mobx-react-devtools'
import PostsIndexPage from './posts/PostsIndexPage.jsx'

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
    <p>Welcome to your blog</p>
  </div>
)

const NewPost = () => (
  <div>
    <h2>New Posts</h2>
    <p>TODO New Post Form</p>
  </div>
)

export default class App extends React.Component {
  render() {

    const posts = this.props.posts;

    return (
      <Router basename="/admin">
        <div>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/posts/new">New Post</Link></li>
          </ul>

          <Route exact path="/" component={Dashboard} />
          <Route exact path="/posts/new" component={NewPost} />
          <Route exact path="/posts/:id" component={NewPost} />
          <Route exact path="/posts"
                 component={(props) => <PostsIndexPage posts={posts} {...props} /> } />
          <DevTools />
        </div>
      </Router>
    )
  }
}
