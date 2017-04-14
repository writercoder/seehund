import React from 'react';
import {Link} from 'react-router-dom';
import {observer, inject} from "mobx-react";

@inject("userStore") @observer
export default class UserWidget extends React.Component {
  render() {

    const store = this.props.userStore;

    if(this.props.userStore.loggedIn) {
      return <p><button onClick={() => store.logout()}>Log out</button></p>;
    } else {
      return <p>You are not logged in</p>
    }
  }

}