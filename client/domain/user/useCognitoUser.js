import React, {useReducer, useEffect} from "react";
import userReducer, {initialState} from "./userReducer";
import {loadUserFromSession, authenticateUser, logoutUser} from "./cognitoHelper";


export function useCognitoUser() {
  const [state, dispatch] = useReducer(userReducer, initialState)


  // useEffect(() => {
  //   if(!state.isInitialized) {
  //     (async () => {
  //       const initialUser = await loadUserFromSession()
  //       if(initialUser) {
  //         dispatch({type: 'AUTHENTICATED', payload: initialUser})
  //       } else {
  //         dispatch({type: 'INITIALIZED'})
  //       }
  //     })()
  //   }
  // }, [state])

  const loadUser = async () => {
    const initialUser = await loadUserFromSession()
    if(initialUser) {
      dispatch({type: 'AUTHENTICATED', payload: initialUser})
    } else {
      dispatch({type: 'INITIALIZED'})
    }
  }

  useEffect(() => {
    loadUser()
  }, [state.isInitialized])

  const authenticate = async (credentials) => {
    dispatch({type: 'LOGIN'})
    const user = await authenticateUser(credentials)
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

