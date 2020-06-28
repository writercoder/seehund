import React from 'react'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout'
import PostForm from '../PostForm'
import { Heading } from 'grommet'

export default function NewPost({
  onCreatePost
}) {
  return (
    <DefaultLayout>
      <Heading level={2}>New Post</Heading>
      <PostForm post={{}} submitLabel="Create" onSubmit={onCreatePost} />
    </DefaultLayout>
  )
}