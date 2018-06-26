import React from 'react'
import {observer, inject} from "mobx-react";
import {Link} from 'react-router-dom'
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Anchor from 'grommet/components/Anchor'

@observer
class PostRow extends React.Component {

  render() {
    const { post, onDeletePost } = this.props;

    const deletePost = (e) => {
      e.preventDefault()
      onDeletePost(post.id)
    }

    return (<TableRow>
      <td>{ post.id }</td>
      <td>{ post.title }</td>
      <td>{ post.content }</td>
      <td><Link to={ `posts/${post.id}` }>Edit</Link></td>
      <td><Anchor onClick={ deletePost }>Delete</Anchor></td>
    </TableRow>)
  }
}


@inject("postsStore") @observer
export default class PostsTable extends React.Component  {
  render() {
    console.log('rendering')
    const store = this.props.postsStore;
    const deletePost = (id) => { store.deletePost(id) }
    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { store.posts.map((post) => <PostRow 
            key={post.id}
            post={post}
            onDeletePost={ deletePost } /> ) }
        </tbody>
      </Table>
    )
  }
}
