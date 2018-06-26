import React from 'react';
import { observable, extendObservable } from 'mobx';
import {observer, inject} from "mobx-react";
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';

@observer
export default class PostForm extends React.Component {

  @observable title = '';
  @observable content = '';

  constructor(props) {
    super(props);
    if(!!props.post) {
      this.title = props.post.title;
      this.content = props.post.content;
    }
  }

  onSubmit = (e) => {
    this.props.onSubmit({
      title: this.title,
      content: this.content
    })
    e.preventDefault()
  }

  render() {
    const submitText = !!this.props.post ? 'Update Post' : 'Create Post'

    return (
      <Form onSubmit={this.onSubmit}>
        <FormField label="Post Title">
          <input type="text"
            value={ this.title }
            onChange={ (e) => { this.title = e.target.value } } />
        </FormField>

        <FormField label="Post Content">
          <textarea
            rows="10"
            cols="50"
            value={ this.content }
            onChange={ (e) => this.content = e.target.value }></textarea>
        </FormField>

        <p>
          <button type="submit">{submitText}</button>
        </p>
      </Form>
    );
  }


}
