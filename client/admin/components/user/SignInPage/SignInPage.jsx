import React from 'react'
import LoggedOutLayout from '../../layouts/LoggedOutLayout'
import LoginForm from './LoginForm'
import {Box} from 'grommet'

export default function SignIn({

}) {
  return (
    <LoggedOutLayout>
      <Box width="medium">
        <LoginForm user={{}} />
      </Box>
    </LoggedOutLayout>
  )
}