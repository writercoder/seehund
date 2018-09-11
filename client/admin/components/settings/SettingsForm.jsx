import React from 'react';

import { observable } from 'mobx';
import { observer, inject } from "mobx-react";

import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput'; 

@observer
export default class SettingsForm extends React.Component {

  @observable title = '';
  @observable description = '';

  constructor(props) {
    super(props);
    if(!!props.metadata) {
      this.title = props.metadata.title;
      this.description = props.metadata.description;
    }
  }

  onSubmit = (e) => {
    this.props.onSubmit({
      title: this.title,
      description: this.description
    })
    e.preventDefault();
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormField label="Blog title">
          <input type="text"
            value={ this.title }
            onChange={ (e) => { this.title = e.target.value } } />
        </FormField>

        <FormField label="Blog description">
          <textarea
            rows="5"
            cols="30"
            value={ this.description }
            onChange={ (e) => this.description = e.target.value }
          ></textarea>
        </FormField>

        <p>
          <button type="submit">Save settings</button>
        </p>
      </Form>
    );
  }

}
