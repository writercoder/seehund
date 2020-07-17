import React from 'react'
import {useUser} from "../../../domain/user";
import {getDisplayName} from "./utils";
import {Redirect} from "react-router-dom";

export default function redirectLoggedInUser(Component) {
  const WrappedComponent = props => {
    const {user} = useUser()
    if(user.isAuthenticated) {
      return <Redirect to="/" />
    }

    return <Component {...props} />
  }
  WrappedComponent.displayName = `LoginRequired(${getDisplayName(Component)})`
  return WrappedComponent
}