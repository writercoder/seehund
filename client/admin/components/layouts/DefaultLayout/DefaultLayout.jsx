import React from 'react';
import PropTypes from 'prop-types'
import logo from '../../../assets/images/Icon/trnsp_seal_white_cloud.png'

import { Grid, Main, Header, Heading, Sidebar, Box, Nav, Image, Anchor, RoutedButton } from 'grommet';

import {
  Article,
  Configure,
  Edit,
  Gallery,
  Projects,
} from "grommet-icons";

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
    <SidebarButton path="/images" icon={<Gallery />} label="Images" />
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
        <Header pad="small" background="light-2">
          <Heading>{title}</Heading>
        </Header>

        <Main
          pad="large"
          justify="start"
          align="center"
          alignContent="start"
          fill={false}
        >
          {children}
        </Main>
      </Box>

      <Box gridArea="sidebar" direction="row">
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


