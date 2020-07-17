import React from 'react'
import PropTypes from 'prop-types'

import {UserContextProvider} from "../../domain/user"
import {MetadataContextProvider} from "../../domain/metadata"
import {PostsContextProvider} from "../../domain/posts/";
import {MessagesContextProvider} from "../../domain/messages/MessagesContext";

export default function AppContextContainer({children}) {

  return (
    <UserContextProvider>
      <MetadataContextProvider>
        <PostsContextProvider>
          <MessagesContextProvider>
            {children}
          </MessagesContextProvider>
        </PostsContextProvider>
      </MetadataContextProvider>
    </UserContextProvider>
  )
}

AppContextContainer.propTypes = {
  children: PropTypes.node.isRequired
}
