import React, {useState} from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Form,
  FormField,
  TextArea,
  TextInput
} from 'grommet'

export default function PostForm({
  post,
  errors,
  submitLabel,
  onSubmit
}) {
  const [value, setValue] = useState(post)

  return (
    <Form
      onSubmit={({value}) => onSubmit(value)}
      errors={errors}
      onChange={nextValue => setValue(nextValue)}
      value={value}
    >
      <FormField required={true} name="title" label="Post Title"  htmlfor="post-title">
        <TextInput id="post-title" name="title" />
      </FormField>

      <FormField required={true} name="slug" label="Post Slug"  htmlfor="post-slug">
        <TextInput id="post-slug" name="slug" />
      </FormField>

      <FormField required={true} name="content" label="Post content"  htmlfor="post-content">
        <TextArea rows="8" fill={true} id="post-content" name="content" size="xlarge" />
      </FormField>

      <Button type="submit" primary label={submitLabel} />
    </Form>
  )
}

PostForm.propTypes = {
  post: PropTypes.object,
  errors: PropTypes.object,
  submitLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}
