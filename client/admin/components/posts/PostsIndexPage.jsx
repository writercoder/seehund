import React from 'react'
import {action} from 'mobx'
import {observer} from 'mobx-react'
import PostsTable from './PostsTable.jsx'

@observer
export default class PostsIndexPage extends React.Component {

  render() {
    if(this.props.posts.fetched) {
      return <PostsTable postsStore={ this.props.posts } />
    } else {
      return (
        <p>Loading posts</p>
      );
    }
  }

  componentWillMount() {
    this.props.posts.fetch()
  }

}