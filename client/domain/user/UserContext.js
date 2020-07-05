import React, {createContext, useContext} from 'react'
import {useCognitoUser} from "./useCognitoUser";

export const UserContext = createContext()

export function UserContextProvider({children}) {
  const user = useCognitoUser()

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
