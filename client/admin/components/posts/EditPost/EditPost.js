import React from 'react'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout'
import PostForm from '../PostForm'
import { Box, Heading } from 'grommet'

export default function EditPost({
  post,
  onUpdatePost
}) {
  return (
    <DefaultLayout>
      <Heading level={2}>Edit Post</Heading>
      <Box width="large">
        <PostForm post={post} submitLabel="Update" onSubmit={onUpdatePost} />
      </Box>
    </DefaultLayout>
  )
}