import React from 'react'
import {observer, inject} from 'mobx-react'
import PostForm from './PostForm.jsx'

@inject("postsStore") @observer
export default class PostPage extends React.Component {

  render() {
    const store = this.props.postsStore;
    if(store.fetched) {
      const post = store.getPost(this.props.id)
      const updatePost = (postData) => { store.updatePost(post.id, postData) }
      return (
        <div>
          <h1>Editing post: { post.title }</h1>
          <PostForm post={ post } onSubmit={ updatePost } />
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