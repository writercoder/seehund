import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {
  Anchor,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";
import DefaultLayout from "../../layouts/DefaultLayout";


export default function PostsIndex({
  posts,
  onDeletePost
}) {
  return (
    <DefaultLayout>
      <Heading level={2}>Posts</Heading>
      <Table size="medium">
        <TableHeader>
          <TableRow>
            <TableCell key="id">
              ID
            </TableCell>
            <TableCell key="slug">
              Slug
            </TableCell>
            <TableCell key="title">
              Title
            </TableCell>
            <TableCell key="edit"></TableCell>
            <TableCell key="delete"></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map(post => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.slug}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell><Link to={ `posts/${post.id}`}>Edit</Link></TableCell>
              <TableCell><Anchor onClick={() => onDeletePost(post)}>Delete</Anchor></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DefaultLayout>
  )
}

PostsIndex.propTypes = {
  posts: PropTypes.array,
  onDeletePost: PropTypes.func
}
