import React from 'react'

import DefaultLayout from './DefaultLayout'
import { Grommet, grommet } from 'grommet'

const grommetDecorator = storyFn => <Grommet full theme={grommet}>{storyFn()}</Grommet>

export default {
  title: "DefaultLayout",
  component: DefaultLayout,
  decorators: [grommetDecorator]
}

export const Default = () => <DefaultLayout title="My blog about clouds"><p>Content goes here</p></DefaultLayout>
