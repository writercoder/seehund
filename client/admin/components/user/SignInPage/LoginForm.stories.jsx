import React from 'react'
import {action} from '@storybook/addon-actions'
import LoginForm from './LoginForm'

export default {
  title: "user / LoginForm",
  component: LoginForm
}

const onSubmit = action('onSubmit')
const user = {
  email: 'test@example.com',
  password: 'secret123$'
}

export const Empty = () => (
  <LoginForm onSubmit={onSubmit} user={{}} />
)

export const WithUser = () => (
  <LoginForm onSubmit={onSubmit} user={user} />
)
