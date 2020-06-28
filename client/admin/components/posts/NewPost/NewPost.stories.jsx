import React from 'react'
import {action} from '@storybook/addon-actions'
import NewPost from './NewPost'

export default {
  title: "posts / NewPost",
  component: NewPost
}

const onCreatePost = action('onCreatePost')

export const Default = () => (
  <NewPost onCreatePost={onCreatePost} />
)

