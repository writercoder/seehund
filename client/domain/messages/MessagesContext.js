import React, {createContext, useContext} from 'react'
import useProvideMessages from "./useProvideMessages";

export const MessagesContext = createContext()

export function MessagesContextProvider({initialValue, children}) {
  const messages = useProvideMessages(initialValue)

  return (
    <MessagesContext.Provider value={messages}>
      {children}
    </MessagesContext.Provider>
  )
}

export function useMessages() {
  return useContext(MessagesContext)
}
