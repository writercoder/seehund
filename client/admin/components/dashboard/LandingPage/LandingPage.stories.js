import React from 'react'
import {action} from '@storybook/addon-actions'
import LandingPage from './LandingPage'
import {LoadedMetadataContextProvider} from "../../../../domain/metadata/mocks";

export default {
  title: "dashboard / LandingPage",
  component: LandingPage,
  decorators: [
    (story) => <LoadedMetadataContextProvider>{story()}</LoadedMetadataContextProvider>
  ]
}

const onCreatePost = action('onCreatePost')

export const Default = () => (
  <LandingPage frontendUrl="https://demo.seehund.org" />
)

