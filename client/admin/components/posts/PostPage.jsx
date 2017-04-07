import React from 'react'
import {observer, inject} from 'mobx-react'
import PostForm from './PostForm.jsx'

@inject("postsStore") @observer
export default class PostPage extends React.Component {

  render() {
    if(this.props.postsStore.fetched) {
      const post = this.props.postsStore.getPost(this.props.id)
      return (
        <div>
          <h1>Editing post: { post.title }</h1>
          <PostForm post={ post } />
        </div>
      )
    } else {
      return (
        <p>Loading post</p>
      );
    }
  }

  componentWillMount() {
    this.props.postsStore.fetch()
  }
}