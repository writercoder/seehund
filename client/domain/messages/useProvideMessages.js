import {useState} from 'react'

export default function useProvideMessages() {
  const [messages, setMessages] = useState([])
  console.log({messages})

  return {
    messages,
    clearMessage: message => (
      setMessages(messages.filter(m => m !== message))
    ),
    pushMessage: message => {
      setMessages([...messages, message])
    }
  }
}