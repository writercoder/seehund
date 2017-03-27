import React from 'react'
import {observer} from "mobx-react";

@observer
class PostRow extends React.Component {
  render() {
    const post = this.props.post;
    return (<tr>
      <td>{ post.title }</td>
      <td>{ post.content }</td>
      <td>{ `posts/${post.id}` }</td>
    </tr>)
  }
}


@observer
export default class PostsTable extends React.Component  {
  render() {
    const posts = this.props.postsStore.posts
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { posts.map((post) => <PostRow key={post.id} post={post} /> ) }
        </tbody>
      </table>
    )
  }
}