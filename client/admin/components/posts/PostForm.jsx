import React from 'react';
import { observable } from 'mobx';

export default class PostForm extends React.Component {

  @observable title;
  @observable content;

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
      <form onSubmit={this.onSubmit}>
        <p>
          <label htmlFor="postTitle">Post Title</label>
          <input type="text" id="postTitle"
                 value={ this.title }
                 onChange={ (e) => this.title = e.target.value } />
        </p>

        <p>
          <label htmlFor="postContent">Post Content</label>
          <textarea
            id="postContent"
            value={ this.content }
            onChange={ (e) => this.content = e.target.value }></textarea>
        </p>

        <p>
          <button type="Submit">{submitText}</button>
        </p>
      </form>
    );
  }


}