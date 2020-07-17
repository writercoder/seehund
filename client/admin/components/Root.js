import React from 'react'
import AppContextContainer from "./AppContextContainer";
import App from './App'

export default function Root() {
  return (
    <AppContextContainer>
      <App />
    </AppContextContainer>
  )
}
