import React from 'react'
import {action} from '@storybook/addon-actions'
import LandingPage from './LandingPage'

export default {
  title: "dashboard / LandingPage",
  component: LandingPage
}

const onCreatePost = action('onCreatePost')

export const Default = () => (
  <LandingPage frontendUrl="https://demo.seehund.org" />
)

