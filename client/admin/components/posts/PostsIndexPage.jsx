import React from 'react'
import {observer, inject} from 'mobx-react'
import PostsTable from './PostsTable.jsx'

@inject("postsStore") @observer
export default class PostsIndexPage extends React.Component {

  render() {
    if(this.props.postsStore.fetched) {
      return <PostsTable />
    } else {
      return (
        <p>Loading posts</p>
      );
    }
  }

  componentWillMount() {
    this.props.postsStore.fetch()
  }

}