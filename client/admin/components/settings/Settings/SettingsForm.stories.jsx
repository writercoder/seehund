import React from 'react'
import {action} from '@storybook/addon-actions'
import SettingsForm from './SettingsForm'
import {blog} from '../fixtures'

export default {
  title: "settings / SettingsForm",
  component: SettingsForm
}

const onSubmit = action('onSubmit')

export const Empty = () => (
  <SettingsForm onSubmit={onSubmit} blog={{}} />
)

export const WithSettings = () => (
  <SettingsForm onSubmit={onSubmit}  blog={blog} />
)
