import React from 'react'
import {observer, inject} from 'mobx-react'
import LoginForm from './LoginForm.jsx'
import LoggedOutLayout from '../layouts/LoggedOutLayout.jsx';

import { Redirect } from 'react-router-dom'

@inject("userStore") @observer
export default class LoginPage extends React.Component {

  logUserIn = ({email, password}) => {
    this.props.userStore.login(email, password);
  }

  render() {
    return <LoggedOutLayout>{ this.renderContent() }</LoggedOutLayout>
  }

  renderContent() {
    if(this.props.userStore.loggedIn) {
      // TODO: Redirect to referrer
      return <Redirect to={{
                pathname: '/',
                state: { from: this.props.location }
              }} />
    } else {
      return (
        <div>
          <h1>Log in to the blog</h1>
          <LoginForm onSubmit={ this.logUserIn } />
        </div>
      );
    }
  }

}