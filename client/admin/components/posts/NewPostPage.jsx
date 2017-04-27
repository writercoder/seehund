import React from 'react'
import {observer, inject} from 'mobx-react'
import { withRouter } from 'react-router'
import RedirectToLogin from '../user/RedirectToLogin.jsx';
import PostForm from './PostForm.jsx'
import DefaultLayout from '../layouts/DefaultLayout.jsx';

@inject("postsStore", "userStore") @observer @withRouter
export default class NewPostsPage extends React.Component {

  createPost = (postFields) => {
    this.props.postsStore.createPost(postFields, (post) => {
      // TODO: <Redirect /> in render method based on some state here?
      this.props.history.push(`${post.id}`)
    });
  }

  render() {
    return <DefaultLayout>{ this.renderContent() }</DefaultLayout>
  }

  renderContent() {
    if(!this.props.userStore.loggedIn) {
      return <RedirectToLogin />
    } else {
      return (
        <div>
          <h1>Create Post</h1>
          <PostForm onSubmit={ this.createPost } />
        </div>
      )
    }
  }
}