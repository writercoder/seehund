import React from 'react'
import LoggedOutLayout from '../../layouts/LoggedOutLayout'
import LoginForm from './LoginForm'
import {Box} from 'grommet'

export default function SignIn({
  user,
  onSubmit
}) {
  return (
    <LoggedOutLayout>
      <Box width="medium">
        <LoginForm user={user} onSubmit={onSubmit} />
      </Box>
    </LoggedOutLayout>
  )
}