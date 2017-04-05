import React from 'react'
import PostForm from './PostForm.jsx'

export default class NewPostsPage extends React.Component {

  render() {

    return (
      <div>
        <h1>Create Post</h1>
        <PostForm onSubmit={ console.info } />
      </div>
    )
  }
}