import {useState} from 'react'

export default function useProvideMessages() {
  const [messages, setMessages] = useState([])

  return {
    popMessages: () => {
      setMessages([])
      return messages
    },
    pushMessage: message => {
      setMessages([...messages, message])
    }
  }
}