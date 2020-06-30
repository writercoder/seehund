import React from 'react'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout'
import PostForm from '../PostForm'
import { Box, Heading } from 'grommet'

export default function NewPost({
  onCreatePost
}) {
  return (
    <DefaultLayout>
      <Box width="large">
        <Heading level={2}>New Post</Heading>
        <PostForm post={{}} submitLabel="Create" onSubmit={onCreatePost} />
      </Box>
    </DefaultLayout>
  )
}