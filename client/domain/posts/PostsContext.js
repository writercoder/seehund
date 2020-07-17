import React, {createContext, useContext} from 'react'
import useProvidePosts from "./useProvidePosts";

export const PostsContext = createContext()

export function PostsContextProvider({initialValue, children}) {
  const posts = useProvidePosts(initialValue)

  return (
    <PostsContext.Provider value={posts}>
      {children}
    </PostsContext.Provider>
  )
}

export function usePosts() {
  return useContext(PostsContext)
}
