import React from 'react';

import {observer, inject} from 'mobx-react'

import DefaultLayout from './DefaultLayout'

@inject("metadataStore") @observer
export default class DefaultLayoutContainer extends React.Component {

  getTitle() {
    if(this.props.metadataStore.fetched) {
      return `${ this.props.metadataStore.metadata.title } - Admin`;
    } else {
      return 'Seehund Blog Admin'
    }
  }

  render() {
    return <DefaultLayout title={this.getTitle()} />
  }
}
