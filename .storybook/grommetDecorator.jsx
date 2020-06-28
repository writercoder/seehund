import React from 'react'
import { Grommet, grommet } from 'grommet'

const grommetDecorator = storyFn => <Grommet full theme={grommet}>{storyFn()}</Grommet>

export default grommetDecorator
