import React from 'react'
import { useUser } from '../../../domain/user/UserContext'
import RedirectToLogin from './RedirectToLogin'
import { getDisplayName } from './utils'

export default function loginRequired(Component) {
  const WrappedComponent = props => {
    const {user} = useUser()
    console.log({user})
    if(!user.isInitialized) {
      return <p>Loading spinner...</p>
    }

    if(!user.isAuthenticated) {
      return <RedirectToLogin />
    }

    return <Component {...props} />
  }
  WrappedComponent.displayName = `LoginRequired(${getDisplayName(Component)})`
  return WrappedComponent
}
