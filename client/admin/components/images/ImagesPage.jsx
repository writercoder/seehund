import React from 'react'
import {observer, inject} from 'mobx-react'

import RedirectToLogin from '../user/RedirectToLogin.jsx'
import DefaultLayout from '../layouts/DefaultLayout.jsx';

import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';

@inject("imagesStore", "userStore", "messagesStore") @observer
export default class ImagesPage extends React.Component {

  render() {
    return <DefaultLayout>{ this.renderContent() }</DefaultLayout>
  }

  handleFileUpload = (event) => {
    console.info(event.target.files);

    this.setState({file: event.target.files[0]});
  }

  handleSubmit = (event) => {
    const store = this.props.imagesStore;
    store.uploadImage(this.state.file);
    event.preventDefault();
  }

  renderContent() {
    const store = this.props.imagesStore;
    const messagesStore = this.props.messagesStore;
    if(!this.props.userStore.loggedIn) {
      return <RedirectToLogin />
    } else {
      return (
        <div>
          <h1>Images</h1>
          <Form onSubmit={this.handleSubmit}>
            <FormField>
              <input label="Upload image" type="file"
                onChange={this.handleFileUpload} />
              <button type="submit">Upload</button>
            </FormField>
          </Form>
          <ul>
            { store.images.map((image) => {
              console.info(image);
              <li>{{ image }}</li>
            }) }
          </ul>
        </div>
      )
    }
  }
}
