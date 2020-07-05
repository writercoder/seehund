import React, {useReducer} from "react";
import userReducer from "./userReducer";
import {loadUserFromSession, authenticateUser, logoutUser} from "./cognitoHelper";


export function useCognitoUser() {
  const [state, dispatch] = useReducer(userReducer, initialState)

  if(!state.isInitialized) {
   loadUserFromSession((user) => {
     if(user) {
       dispatch({type: 'AUTHENTICATED', payload: user})
     }
   })
   dispatch({type: 'INITIALIZED'})
  }

  const authenticate = async (credentials) => {
    dispatch({type: 'LOGIN'})
    const user = await authenticateUser()
    if(user.error) {
      dispatch({type: 'LOGIN_ERROR', payload: user.error})
    } else {
      dispatch({type: 'AUTHENTICATED', payload: user})
    }
  }

  const logout = () => {
    logoutUser()
    dispatch({type: 'LOGOUT'})
  }

  return {
    user: state,
    authenticate,
    logout
  }
}

