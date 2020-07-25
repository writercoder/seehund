import React from 'react'
import {action} from '@storybook/addon-actions'
import EditPost from './EditPost'
import {posts} from '../../../../domain/posts/fixtures'
import {MessagesContextProvider} from "../../../../domain/messages/MessagesContext";

export default {
  title: "posts / EditPost",
  component: EditPost,
  decorators: [
    story => <MessagesContextProvider>{story()}</MessagesContextProvider>
  ]
}

const onUpdatePost = action('onUpdatePost')

export const Default = () => (
  <EditPost onUpdatePost={onUpdatePost} post={posts.first} />
)

