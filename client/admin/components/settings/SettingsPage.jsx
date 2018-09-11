import React from 'react';

import {observer, inject} from "mobx-react";

import SettingsForm from './SettingsForm.jsx';
import RedirectToLogin from '../user/RedirectToLogin.jsx'
import DefaultLayout from '../layouts/DefaultLayout.jsx';

@inject("metadataStore", "messagesStore", "userStore") @observer
export default class SettingsPage extends React.Component {

  render() {
    return <DefaultLayout>{ this.renderContent() }</DefaultLayout>
  }

  renderContent() {
    const { metadataStore, messagesStore, userStore } = this.props;

    const updateMetadata = metadata => {
      metadataStore.setMetadata(metadata, () => {
        messagesStore.okay("Saved settings");
      });
    };

    if(!userStore.loggedIn) {
      return <RedirectToLogin />
    } else if(metadataStore.fetched) {
      return (
        <div>
          <h1>Blog settings</h1>
          <SettingsForm
            metadata={metadataStore.metadata}
            onSubmit={updateMetadata} />
        </div>
      )
    } else {
      return (
        <p>Loading settings</p>
      );
    }
  }
}
