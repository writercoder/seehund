import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'

import {Grommet, grommet} from 'grommet'
import {observer, inject} from "mobx-react";
import DevTools from 'mobx-react-devtools'
import Dashboard from './dashboard/Dashboard.jsx'
import LoginPage from './user/LoginPage.jsx'
import PostsIndexPage from './posts/PostsIndexPage.jsx'
import NewPostPage from './posts/NewPostPage.jsx'
import PostPage from './posts/PostPage.jsx'
import SettingsPage from './settings/SettingsPage.jsx'
import ImagesPage from './images/ImagesPage.jsx'


@inject("messagesStore")
@withRouter
class AppWrapper extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.props.messagesStore.clear();
  }

  render() {
    return <Grommet theme={grommet} centered={false}>
      {this.props.children}
    </Grommet>
  }
}


@observer
export default class extends React.Component {

  render() {

    return (
      <Router basename="/">
        <AppWrapper>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/images" component={ImagesPage} />
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
          <Route exact path="/settings" component={SettingsPage} />
          <DevTools />
        </AppWrapper>
      </Router>
    )
  }
}
