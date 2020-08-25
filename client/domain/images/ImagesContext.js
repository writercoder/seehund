import React, {createContext, useContext} from 'react'
import useProvideImages from "./useProvideImages";

export const ImagesContext = createContext()

export function ImagesContextProvider({initialValue, children}) {
  const posts = useProvideImages(initialValue)

  return (
    <ImagesContext.Provider value={posts}>
      {children}
    </ImagesContext.Provider>
  )
}

export function useImages() {
  return useContext(ImagesContext)
}
