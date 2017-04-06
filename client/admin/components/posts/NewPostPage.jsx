import React from 'react'
import PostForm from './PostForm.jsx'
import {observer, inject} from 'mobx-react'
import { withRouter } from 'react-router'

@inject("postsStore") @observer @withRouter
export default class NewPostsPage extends React.Component {

  createPost = (postFields) => {
    this.props.postsStore.createPost(postFields, (post) => {
      this.props.history.push(`${post.id}`)
    });
  }

  render() {

    return (
      <div>
        <h1>Create Post</h1>
        <PostForm onSubmit={ this.createPost } />
      </div>
    )
  }
}