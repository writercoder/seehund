import React from 'react'
import {AuthenticatedUserProvider} from '../user/mocks'
import {MetadataContext} from "./MetadataContext";
import {loadedMetadata} from "./fixtures";
import {MessagesContextProvider} from "../messages/MessagesContext";


export const MetadataContextProvider = ({value, children}) => (
  <MessagesContextProvider>
    <AuthenticatedUserProvider>
      <MetadataContext.Provider value={value}>
        {children}
      </MetadataContext.Provider>
    </AuthenticatedUserProvider>
  </MessagesContextProvider>
)

export const LoadedMetadataContextProvider = ({children}) => (
  <MetadataContextProvider value={loadedMetadata}>{children}</MetadataContextProvider>
)
