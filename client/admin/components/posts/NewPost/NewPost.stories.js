import React from 'react'
import {action} from '@storybook/addon-actions'
import NewPost from './NewPost'
import {LoadedMetadataContextProvider} from "../../../../domain/metadata/mocks";

export default {
  title: "posts / NewPost",
  component: NewPost,
  decorators: [
    story => <LoadedMetadataContextProvider>{story()}</LoadedMetadataContextProvider>
  ]
}

const onCreatePost = action('onCreatePost')

export const Default = () => (
  <NewPost onCreatePost={onCreatePost} />
)

