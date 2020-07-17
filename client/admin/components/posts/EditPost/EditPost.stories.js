import React from 'react'
import {action} from '@storybook/addon-actions'
import EditPost from './EditPost'
import {posts} from '../fixtures'

export default {
  title: "posts / EditPost",
  component: EditPost
}

const onUpdatePost = action('onUpdatePost')

export const Default = () => (
  <EditPost onUpdatePost={onUpdatePost} post={posts.first} />
)

