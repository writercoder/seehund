import React from 'react'
import DefaultLayout from '../../layouts/DefaultLayout/'
import { Anchor, Box, Heading } from 'grommet'

export default function LandingPage({
  frontendUrl
}) {
  return (
    <DefaultLayout>
      <Box width="large">
        <Heading level={2}>Welcome to your Seehund blog</Heading>
        <Heading level={3}>Frontend</Heading>
        <p>
          <Anchor
            href={ frontendUrl }
            target="_blank"
          >{ frontendUrl }
          </Anchor>
        </p>
      </Box>
    </DefaultLayout>
  )
}
