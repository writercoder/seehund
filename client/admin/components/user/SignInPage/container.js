import React from 'react'
import SignInPage from "./SignInPage";
import {useUser} from "../../../../domain/user";

export default function SignInPageContainer() {
  const {user, authenticate} = useUser()

  console.log({user})

  return (
    <SignInPage user={user} onSubmit={authenticate} />
  )
}