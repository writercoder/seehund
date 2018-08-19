import React from 'react'
import {observer, inject} from 'mobx-react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import RedirectToLogin from '../user/RedirectToLogin.jsx';
import PostForm from './PostForm.jsx'
import DefaultLayout from '../layouts/DefaultLayout.jsx';

@inject("postsStore", "userStore", "messagesStore") @observer @withRouter
export default class NewPostsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      postCreated: false
    }
  }

  createPost = (postFields) => {
    this.props.postsStore.createPost(postFields, (post) => {
      // TODO: <Redirect /> in render method based on some state here?
      // this.props.history.push(`${post.id}`)
      this.setState({postCreated: true})
      this.props.messagesStore.okay(`Created Post "${post.title}"`)
    });
  }

  render() {
    return <DefaultLayout>{ this.renderContent() }</DefaultLayout>
  }

  renderContent() {
    if(!this.props.userStore.loggedIn) {
      return <RedirectToLogin />
    } else if(this.state.postCreated) {
      return <Redirect to={{
        pathname: '/posts'
      }} />
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
