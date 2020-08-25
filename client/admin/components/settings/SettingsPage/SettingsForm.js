import React, {useState} from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Form,
  FormField,
  TextArea,
  TextInput
} from 'grommet'

export default function SettingsForm({
  blog,
  errors,
  onSubmit
}) {
  const [value, setValue] = useState(blog)

  return (
    <Form
      onSubmit={({value}) => onSubmit(value)}
      errors={errors}
      onChange={nextValue => setValue(nextValue)}
      value={value}
    >
      <FormField required={true} name="title" label="Blog Title"  htmlfor="blog-title">
        <TextInput id="blog-title" name="title" />
      </FormField>

      <FormField name="description" label="Blog Description"  htmlfor="blog-description">
        <TextArea rows="8" fill={true} id="blog-description" name="description" />
      </FormField>

      <Button type="submit" primary label="Update" />
    </Form>
  )
}

SettingsForm.propTypes = {
  post: PropTypes.object,
  errors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
}
