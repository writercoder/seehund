import React from 'react';
import {observable} from 'mobx';
import {observer} from "mobx-react";

@observer
export default class LoginForm extends React.Component {

  @observable email = ''
  @observable password = ''

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      email: this.email,
      password: this.password
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <p>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email"
                 value={ this.email }
                 onChange={ (e) => { this.email = e.target.value } } />
        </p>

        <p>
          <label htmlFor="password">Password</label>
          <input type="password" id="password"
                 value={ this.password }
                 onChange={ (e) => { this.password = e.target.value } } />
        </p>

        <p>
          <button type="Submit">Login</button>
        </p>
      </form>
    )
  }

}