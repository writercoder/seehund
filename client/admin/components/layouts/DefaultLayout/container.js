import React from 'react';

import DefaultLayout from './DefaultLayout'
import {useMetadata} from "../../../../domain/metadata/MetadataContext";
import {useUser} from "../../../../domain/user";


export default function DefaultLayoutContainer ({children}) {
  const { logout } = useUser()
  const metadata = useMetadata()

  if(!metadata.isLoaded) {
    return <p>Loading...</p>
  }

  return (
    <DefaultLayout title={metadata.value.title} onLogout={logout}>
      {children}
    </DefaultLayout>
  )
}
