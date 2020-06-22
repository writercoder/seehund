import React from 'react';
import PropTypes from 'prop-types'
import logo from '../../../assets/images/Icon/trnsp_seal_white_cloud.png'

import { Grid, Main, Header, Heading, Sidebar, Box, Nav, Image, Anchor, RoutedButton } from 'grommet';

import {
  Analytics,
  Article,
  Chat,
  Clock,
  Configure,
  Edit,
  Projects,
  Split,
  StatusInfoSmall
} from "grommet-icons";

// import UserWidget from '../user/UserWidget.jsx'
// import MessageBox from '../messages/MessageBox.jsx'

const SidebarButton = ({ icon, label, ...rest }) => (
  <Box pad="small">
    <RoutedButton
      gap="medium"
      alignSelf="start"
      plain
      icon={icon}
      label={label}
      {...rest}
    />
  </Box>
)

const MainNavigation = () => (
  <Nav gap="large" responsive={false}>
    <SidebarButton path="/dashboard" icon={<Projects />} label="Dashboard" />
    <SidebarButton path="/posts" icon={<Article />} label="Posts" />
    <SidebarButton path="/posts/new" icon={<Edit />} label="New Post" />
    <SidebarButton path="/posts" icon={<Article />} label="Posts" />
    <SidebarButton path="/settings" icon={<Configure />} label="Settings" />
  </Nav>
);


export default function DefaultLayout({title, children}) {

  return (
    <Grid
      fill
      rows={["auto", "flex"]}
      columns={["auto", "flex"]}
      areas={[
        { name: 'sidebar', start: [0, 0], end: [0, 1] },
        { name: 'main', start: [1, 0], end: [1, 1] },
      ]}
    >

      <Box gridArea="main">
        <Header>
          <Heading>{title}</Heading>
        </Header>

        <Main pad="large" justify="center" align="center">
          {children}
        </Main>
      </Box>

      <Box direction="row" height={{ min: "100%" }}>
        <Sidebar responsive={false} background="neutral-2"  pad="medium">
          <Image src={logo} width={200} />
          <MainNavigation />
        </Sidebar>
      </Box>

    </Grid>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
}


