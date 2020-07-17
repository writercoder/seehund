import React from 'react'
import {action} from '@storybook/addon-actions'
import PostForm from './PostForm'
import {posts} from '../fixtures'

export default {
  title: "posts / PostForm",
  component: PostForm
}

const onSubmit = action('onSubmit')

export const Empty = () => (
  <PostForm onSubmit={onSubmit} submitLabel="Create" post={{}} />
)

export const WithPost = () => (
  <PostForm onSubmit={onSubmit} submitLabel="Update" post={posts.first} />
)
