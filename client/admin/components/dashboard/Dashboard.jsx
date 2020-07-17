import React from 'react';
import {observer, inject} from 'mobx-react';
import Anchor from 'grommet/components/Anchor'
import DefaultLayout from '../layouts/DefaultLayout.old.jsx';
import RedirectToLogin from '../user/RedirectToLogin.js'
import DomainConfig from './DomainConfig.jsx'

@inject("userStore", "blogStore") @observer
export default class extends React.Component {

  render() {
    return (
      <DefaultLayout>
        { this.renderContent() }
      </DefaultLayout>
    );
  }

  renderContent() {
    const frontendUrl = this.props.blogStore.frontendUrl();

    if(!this.props.userStore.loggedIn) {
      return <RedirectToLogin  />
    } else {
      return (
        <div>
          <h2>Welcome to your Seehund blog</h2>
          <h3>Frontend</h3>
          <p>
            <Anchor
              href={ frontendUrl }
              target="_blank"
            >{ frontendUrl }
            </Anchor>
          </p>
          <DomainConfig />
        </div>
      )
    }
  }
}
