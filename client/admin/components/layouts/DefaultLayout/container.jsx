import React from 'react';

import DefaultLayout from './DefaultLayout'
import {useMetadata} from "../../../../domain/metadata/MetadataContext";


export default function DefaultLayoutContainer ({children}) {
  const metadata = useMetadata()

  return (
    <DefaultLayout title={metadata.value.title}>
      {children}
    </DefaultLayout>
  )
}
