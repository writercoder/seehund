import React, {useState} from 'react'

import {
  Button,
  Form,
  FormField,
  TextInput
} from 'grommet'

export default function LoginForm({
  user,
  errors,
  onSubmit
}) {
  const [value, setValue] = useState(user)

  return (
    <Form
      onSubmit={({value}) => onSubmit(value)}
      errors={errors}
      onChange={nextValue => setValue(nextValue)}
      value={value}
    >
      <FormField required name="username" label="Email"  htmlfor="email-address">
        <TextInput type="email" id="email-address" name="username" />
      </FormField>

      <FormField required type="password" name="password" label="password"  htmlfor="password">
        <TextInput id="password" name="password" type="password" />
      </FormField>

      <Button type="submit" primary label="Login" />
    </Form>
  )
}