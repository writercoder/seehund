import React from 'react';
import awsConfig from './../config/aws'

console.info(awsConfig)

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
    <p>Welcome to your blog</p>
  </div>
)

const PostsIndex = ({ match }) => (
  <div>
    <h2>Posts</h2>
    <p>TODO List Posts</p>
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
    return (
      <Router basename="/admin">
        <div>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/new_post">New Post</Link></li>
          </ul>

          <Route exact path="/" component={Dashboard} />
          <Route path="/posts" component={PostsIndex} />
          <Route path="/new_post" component={NewPost} />
        </div>
      </Router>
    )
  }
}
