import React, {useState} from 'react'
import Message from './Message'
import {Button} from 'grommet'
import {messages} from "../fixtures";

export default {
  component: Message,
  title: 'messages / Message'
}

export const Success = () => {
  const [message, setMessage] = useState()
  return (
    <>
      <Button onClick={() => setMessage(messages.success)}>Show message</Button>
      {message && <Message {...messages.success} onClose={() => setMessage(null)} />}
    </>
  )
}