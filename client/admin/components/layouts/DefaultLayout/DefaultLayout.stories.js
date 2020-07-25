import React from 'react'

import DefaultLayout from './DefaultLayout'
import {MessagesContextProvider} from "../../../../domain/messages/MessagesContext";

export default {
  title: "DefaultLayout",
  component: DefaultLayout,
  decorators: [
    story => <MessagesContextProvider>{story()}</MessagesContextProvider>
  ]
}

export const Default = () => <DefaultLayout title="My blog about clouds"><p>Content goes here</p></DefaultLayout>
