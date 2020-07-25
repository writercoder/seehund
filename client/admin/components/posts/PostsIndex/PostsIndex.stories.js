import React from 'react'
import PostsIndex from './PostsIndex'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout'
import {action} from '@storybook/addon-actions'
import {postsList} from '../../../../domain/posts/fixtures'
import {LoadedMetadataContextProvider} from "../../../../domain/metadata/mocks";

export default {
  title: "posts / PostsIndex",
  component: PostsIndex,
  decorators: [
    story => <LoadedMetadataContextProvider>{story()}</LoadedMetadataContextProvider>
  ]
}

const onDeletePost = action('onDeletePost')

export const Default = () => (
  <PostsIndex posts={postsList} onDeletePost={onDeletePost} />
)

export const Empty = () => (
  <PostsIndex posts={[]} onDeletePost={onDeletePost} />
)
