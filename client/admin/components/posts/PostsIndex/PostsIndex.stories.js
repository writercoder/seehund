import React from 'react'
import PostsIndex from './PostsIndex'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout'
import {action} from '@storybook/addon-actions'
import {postsList} from '../fixtures'

export default {
  title: "posts / PostsIndex",
  component: PostsIndex
}

const onDeletePost = action('onDeletePost')

export const Default = () => (
  <DefaultLayout title="My blog about clouds">
    <PostsIndex posts={postsList} onDeletePost={onDeletePost} />
  </DefaultLayout>
)

export const Empty = () => (
  <DefaultLayout title="My blog about clouds">
    <PostsIndex posts={[]} onDeletePost={onDeletePost} />
  </DefaultLayout>
)
