import React from 'react'
import {Redirect} from 'react-router-dom'

export default function RedirectToLogin(props) {
  return <Redirect to={{
    pathname: '/login',
    state: { from: props.location }
  }} />
}
