import React from 'react';


import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';

import UserWidget from '../user/UserWidget.jsx'

export default class extends React.Component {

  render() {
    return (
      <Split flex="right" priority="right">
        <Sidebar colorIndex="brand" size="medium">
          <Header pad="medium" justify="between">
            <Title>
              Cloud Blog Admin
            </Title>
          </Header>
          <Box flex="grow" justify="start">
            <Menu primary={true}>
              <Anchor path="/">
                Dashboard
              </Anchor>
              <Anchor path="/posts">
                Posts
              </Anchor>
              <Anchor path="/posts/new">
                New Post
              </Anchor>
            </Menu>
          </Box>
          <UserWidget />
        </Sidebar>
        <Box pad="large" >
          { this.props.children }
        </Box>
      </Split>
    );
  }
}