import React from 'react'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout'
import PostForm from '../PostForm'
import { Heading } from 'grommet'

export default function EditPost({
  post,
  onUpdatePost
}) {
  return (
    <DefaultLayout>
      <Heading level={2}>Edit Post</Heading>
      <PostForm post={post} submitLabel="Update" onSubmit={onUpdatePost} />
    </DefaultLayout>
  )
}