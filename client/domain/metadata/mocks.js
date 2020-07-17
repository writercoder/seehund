import React from 'react'
import {AuthenticatedUserProvider} from '../user/mocks'
import {MetadataContext} from "./MetadataContext";
import {loadedMetadata} from "./fixtures";


export const MetadataContextProvider = ({value, children}) => (
  <AuthenticatedUserProvider>
    <MetadataContext.Provider value={value}>
      {children}
    </MetadataContext.Provider>
  </AuthenticatedUserProvider>
)

export const LoadedMetadataContextProvider = ({children}) => (
  <MetadataContextProvider value={loadedMetadata}>{children}</MetadataContextProvider>
)
