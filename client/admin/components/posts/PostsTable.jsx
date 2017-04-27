import React from 'react'
import {observer, inject} from "mobx-react";
import {Link} from 'react-router-dom'
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

@observer
class PostRow extends React.Component {
  render() {
    const post = this.props.post;
    return (<TableRow>
      <td>{ post.id }</td>
      <td>{ post.title }</td>
      <td>{ post.content }</td>
      <td><Link to={ `posts/${post.id}` }>Edit</Link></td>
    </TableRow>)
  }
}


@inject("postsStore") @observer
export default class PostsTable extends React.Component  {
  render() {
    const posts = this.props.postsStore.posts
    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { posts.map((post) => <PostRow key={post.id} post={post} /> ) }
        </tbody>
      </Table>
    )
  }
}