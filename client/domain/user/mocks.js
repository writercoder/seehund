import React from 'react'
import {UserContext} from "./UserContext";
import {initialUser, authenticatedUser} from "./fixtures";

export function UserContextProvider({children, user}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export const InitialUserProvider = ({children}) => (
  <UserContext.Provider value={initialUser}>{children}</UserContext.Provider>
)

export const AuthenticatedUserProvider = ({children}) => (
  <UserContext.Provider value={authenticatedUser}>{children}</UserContext.Provider>
)

