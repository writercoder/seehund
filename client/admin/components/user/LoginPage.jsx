import React from 'react'
import {observer, inject} from 'mobx-react'
import LoginForm from './LoginForm.jsx'

@inject("userStore") @observer
export default class LoginPage extends React.Component {

  logUserIn = ({email, password}) => {
    this.props.userStore.login(email, password);
  }

  render() {
    if(this.props.userStore.loggedIn) {
      // TODO: Redirect
      return <p>You are already logged in</p>
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