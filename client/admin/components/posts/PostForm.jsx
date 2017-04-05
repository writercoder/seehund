import React from 'react';
import { observable } from 'mobx';

export default class PostForm extends React.Component {

  @observable title;
  @observable body;

  constructor(props) {
    super(props);
    if(!!props.post) {
      this.title = props.post.title;
      this.body = props.post.body;
    }
  }

  onSubmit = (e) => {
    this.props.onSubmit({
      title: this.title,
      body: this.body
    })
    e.preventDefault()
  }

  render() {

    const submitText = !!this.props.post ? 'Update Post' : 'Create Post'

    return (
      <form onSubmit={this.onSubmit}>
        <p>
          <label htmlFor="postTitle">Post Title</label>
          <input type="text" id="postTitle"
                 value={ this.title }
                 onChange={ (e) => this.title = e.target.value } />
        </p>

        <p>
          <label htmlFor="postBody">Post Body</label>
          <textarea
            id="postBody"
            value={ this.body }
            onChange={ (e) => this.body = e.target.value }></textarea>
        </p>

        <p>
          <button type="Submit">{submitText}</button>
        </p>
      </form>
    );
  }


}