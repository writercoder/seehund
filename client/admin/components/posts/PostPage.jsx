import React from 'react'
import {observer, inject} from 'mobx-react'
import PostForm from './PostForm.jsx'
import RedirectToLogin from '../user/RedirectToLogin.jsx'
import DefaultLayout from '../layouts/DefaultLayout.jsx';

@inject("postsStore", "userStore", "messagesStore") @observer
export default class PostPage extends React.Component {

  render() {
    return <DefaultLayout>{ this.renderContent() }</DefaultLayout>
  }

  renderContent() {
    const store = this.props.postsStore;
    const messagesStore = this.props.messagesStore;
    if(!this.props.userStore.loggedIn) {
      return <RedirectToLogin />
    } else if(store.fetched) {
      const post = store.getPost(this.props.id)
      const updatePost = (postData) => {
        store.updatePost(post.id, postData, () => {
          messagesStore.okay("Updated post")
        })
      }
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
