import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {observer, inject} from "mobx-react";
import DevTools from 'mobx-react-devtools'
import PrivateRoute from './user/PrivateRoute.jsx'
import LoginPage from './user/LoginPage.jsx'
import PostsIndexPage from './posts/PostsIndexPage.jsx'
import NewPostPage from './posts/NewPostPage.jsx'
import PostPage from './posts/PostPage.jsx'

const Dashboard = () => (
  <div>
    <h2>Dashboard</h2>
    <p>Welcome to your blog</p>
  </div>
)


@observer
export default class App extends React.Component {
  render() {

    return (
      <Router basename="/admin">
        <div>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/posts/new">New Post</Link></li>
          </ul>

          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/posts/:id" render={(props) => {
            if(props.match.params.id == 'new') {
              return <NewPostPage />
            } else {
              return <PostPage id={props.match.params.id} />
            }
          }} />
          <Route exact path="/posts"
                 render={(props) => <PostsIndexPage {...props} /> } />
          <DevTools />
        </div>
      </Router>
    )
  }
}
