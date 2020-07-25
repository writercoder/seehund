import React from 'react'
import {
  BrowserRouter as Router,
  Route, Switch,
} from 'react-router-dom'
import {Grommet, grommet} from "grommet";
import SignInPage from "./user/SignInPage";
import LandingPage from "./dashboard/LandingPage"
import PostsIndex from "./posts/PostsIndex";
import NewPost from "./posts/NewPost";
import loginRequired from "./user/loginRequired";
import redirectLoggedInUser from "./user/redirectLoggedInUser";
import EditPost from "./posts/EditPost";

export default function App() {
  return (
    <Grommet full theme={grommet} centered={false}>
      <Router basename="/">
        <Switch>
          <Route exact path="/login" component={redirectLoggedInUser(SignInPage)} />
          <Route exact path="/" component={loginRequired(LandingPage)} />
          <Route exact path="/posts" component={loginRequired(PostsIndex)} />
          <Route exact path="/write" component={loginRequired(NewPost)} />
          <Route exact path="/posts/:id" component={loginRequired(EditPost)} />
        </Switch>
      </Router>
    </Grommet>
  )
}