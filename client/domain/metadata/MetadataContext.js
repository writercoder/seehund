import React, {createContext, useContext} from 'react'
import useProvideMetadata from "./useProvideMetadata";

export const MetadataContext = createContext()

export function MetadataContextProvider({initialStore, children}) {
  const metadata = useProvideMetadata()

  return (
    <MetadataContext.Provider value={metadata}>
      {children}
    </MetadataContext.Provider>
  )
}

export function useMetadata() {
  return useContext(MetadataContext)
}
