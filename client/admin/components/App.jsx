import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import App from 'grommet/components/App';
import {observer, inject} from "mobx-react";
import DevTools from 'mobx-react-devtools'
import Dashboard from './dashboard/Dashboard.jsx'
import LoginPage from './user/LoginPage.jsx'
import PostsIndexPage from './posts/PostsIndexPage.jsx'
import NewPostPage from './posts/NewPostPage.jsx'
import PostPage from './posts/PostPage.jsx'


@observer
export default class extends React.Component {
  render() {

    return (
      <Router basename="/admin">
        <App centered={false}>
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
        </App>
      </Router>
    )
  }
}
