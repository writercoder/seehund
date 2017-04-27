import React from 'react';
import {observer, inject} from 'mobx-react'
import DefaultLayout from '../layouts/DefaultLayout.jsx';
import RedirectToLogin from '../user/RedirectToLogin.jsx'

@inject("userStore") @observer
export default class extends React.Component {

  render() {
    return (
      <DefaultLayout>
        { this.renderContent() }
      </DefaultLayout>
    );
  }

  renderContent() {
    if(!this.props.userStore.loggedIn) {
      return <RedirectToLogin />
    } else {
      return <p>Welcome to your blog</p>
    }
  }
}