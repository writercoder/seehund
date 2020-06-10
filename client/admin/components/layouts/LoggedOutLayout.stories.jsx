import React from 'react'

import LoggedOutLayout from './LoggedOutLayout'
import { Grommet, grommet } from 'grommet'

const grommetDecorator = storyFn => <Grommet theme={grommet}>{storyFn()}</Grommet>

export default {
  title: "LoggedOutLayout",
  component: LoggedOutLayout,
  decorators: [grommetDecorator]
}

export const Default = () => <LoggedOutLayout><p>Content goes here</p></LoggedOutLayout>