import React from 'react'

import MessageBox from "./MessageBox";
import {Box, Text} from "grommet";

export default {
  title: 'messages / MessageBox',
  component: MessageBox
}

export const All = () => (
  <Box pad="large" gap="large">
    <MessageBox level="success"><Text>Post saved successfully</Text></MessageBox>
    <MessageBox level="warning"><Text>Your post will be published</Text></MessageBox>
    <MessageBox level="critical"><Text>An error occurred</Text></MessageBox>
    <MessageBox level="critical"><Text>Error saving data. Server responded with: 418 I'm a teapot</Text></MessageBox>
  </Box>
)