import React from 'react';

import {observer, inject} from 'mobx-react'

import { Grid, Main, Header, Title, Sidebar, Box, Menu, Anchor } from 'grommet';

// import UserWidget from '../user/UserWidget.jsx'
// import MessageBox from '../messages/MessageBox.jsx'


@inject("metadataStore") @observer
export default class extends React.Component {

  render() {
    <Grid
      rows={['xxsmall', 'xsmall']}
      columns={['xsmall', 'small']}
      gap="small"
      areas={[
        { name: 'header', start: [0, 0], end: [1, 0] },
        { name: 'sidebar', start: [0, 1], end: [0, 1] },
        { name: 'main', start: [1, 1], end: [1, 1] },
      ]}
    >
      <Header gridArea="header">
        <Title>
          { this.renderTitle() }
        </Title>
      </Header>

      <Sidebar gridArea="sidebar">
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
            <Anchor path="/images">
              Images
            </Anchor>
            <Anchor path="/settings">
              Settings
            </Anchor>
          </Menu>
        </Box>
      </Sidebar>

      <Main gridArea="main">
        {this.props.children}
      </Main>

    </Grid>
  }

  // render() {
  //   return (
  //     <Split flex="right" priority="right">
  //       <Sidebar colorIndex="brand" size="medium">
  //         <Header pad="medium" justify="between">
  //           <Title>
  //             { this.renderTitle() }
  //           </Title>
  //         </Header>
  //         <Box flex="grow" justify="start">
  //           <Menu primary={true}>
  //             <Anchor path="/">
  //               Dashboard
  //             </Anchor>
  //             <Anchor path="/posts">
  //               Posts
  //             </Anchor>
  //             <Anchor path="/posts/new">
  //               New Post
  //             </Anchor>
  //             <Anchor path="/images">
  //               Images
  //             </Anchor>
  //             <Anchor path="/settings">
  //               Settings
  //             </Anchor>
  //           </Menu>
  //         </Box>
  //         <UserWidget />
  //       </Sidebar>
  //       <Box pad="large" >
  //         <MessageBox />
  //         { this.props.children }
  //       </Box>
  //     </Split>
  //   );
  // }

  renderTitle() {
    if(this.props.metadataStore.fetched) {
      return `${ this.props.metadataStore.metadata.title } - Admin`;
    } else {
      return 'Seehund Blog Admin'
    }
  }
}
