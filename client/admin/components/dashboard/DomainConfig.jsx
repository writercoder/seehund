import React from 'react';
import {observer, inject} from 'mobx-react';

@inject("blogStore") @observer
export default class DomainConfig extends React.Component {

  render() {
    const cdnDomain = this.props.blogStore.webCDNDomain()
    const frontendUrl = this.props.blogStore.frontendUrl()

    if(!this.props.blogStore.usingCustomDomain()) {
      return <p>CNAME target for custom domain hosting {cdnDomain}</p>
    } else {
      return (
        <div>
          <p>Create a CNAME record for {frontendUrl} pointing to {cdnDomain}</p>
        </div>
      )
    }
  }
}