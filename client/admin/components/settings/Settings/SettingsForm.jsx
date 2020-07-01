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

  console.log(value)

  return (
    <Form
      onSubmit={onSubmit}
      errors={errors}
      onChange={nextValue => setValue(nextValue)}
      value={value}
    >
      <FormField required={true} name="title" label="Blog Title"  htmlfor="blog-title">
        <TextInput id="blog-title" name="title" />
      </FormField>

      <FormField required={true} name="description" label="Blog Description"  htmlfor="blog-description">
        <TextArea rows="8" fill={true} id="blog-description" name="description" />
      </FormField>

      <Button type="submit" primary label="Update" />
    </Form>
  )
}

SettingsForm.propTypes = {
  post: PropTypes.object,
  errors: PropTypes.object,
  submitLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}
