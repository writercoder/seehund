import React from 'react'
import {action} from '@storybook/addon-actions'
import Settings from './Settings'
import {blog} from '../fixtures'

export default {
  title: "settings / Settings",
  component: Settings
}

const onUpdateSettings = action('onUpdateSettings')

export const Default = () => (
  <Settings onUpdateSettings={onUpdateSettings} blog={blog} />
)

