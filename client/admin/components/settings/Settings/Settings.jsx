import React from 'react'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout'
import SettingsForm from './SettingsForm'
import { Box, Heading } from 'grommet'

export default function Settings({
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
