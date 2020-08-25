import React from 'react'
import {action} from '@storybook/addon-actions'
import SettingsPage from './SettingsPage'
import {blog} from '../../../../domain/settings/fixtures'

export default {
  title: "settings / SettingsPage",
  component: SettingsPage
}

const onUpdateSettings = action('onUpdateSettings')

export const Default = () => (
  <SettingsPage onUpdateSettings={onUpdateSettings} blog={blog} />
)

