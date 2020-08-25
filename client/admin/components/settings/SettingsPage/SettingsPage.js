import React from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import SettingsForm from './SettingsForm'
import { Box, Heading } from 'grommet'

export default function SettingsPage({
  blog,
  onUpdateSettings
}) {
  return (
    <DefaultLayout>
      <Box width="large">
        <Heading level={2}>Blog Settings</Heading>
        <SettingsForm blog={blog} onSubmit={onUpdateSettings} />
      </Box>
    </DefaultLayout>
  )
}
