import React from 'react'
import Message from './Message'
import {useMessages} from "../../../../domain/messages";

export default function MessageContainer() {
  const {messages, clearMessage} = useMessages()

  console.log(messages)

  const message = messages.length > 0 && [...messages].pop()

  if(!message) {
    return null
  }

  return (
    <Message {...message} onClose={() => clearMessage(message)} />
  )
}


