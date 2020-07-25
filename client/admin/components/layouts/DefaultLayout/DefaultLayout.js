import React from 'react';
import PropTypes from 'prop-types'
import {useHistory} from "react-router";
import logo from '../../../assets/images/Icon/trnsp_seal_white_cloud.png'
import Message from '../../messages/Message'

import {Grid, Main, Header, Heading, Sidebar, Box, Nav, Image, Button} from 'grommet';

import {
  Article,
  Configure,
  Edit,
  Gallery,
  Projects,
} from "grommet-icons";



const SidebarButton = ({ icon, label, path, ...rest }) => {
  const history = useHistory()
  const handleClick = (e) => {
    e.preventDefault()
    history.push(path)
  }

  return (
    <Box pad="small">
      <Button
        gap="medium"
        alignSelf="start"
        plain
        icon={icon}
        label={label}
        onClick={handleClick}
        {...rest}
      />
    </Box>
  )
}

const MainNavigation = () => (
  <Nav gap="large" responsive={false}>
    <SidebarButton path="/" icon={<Projects />} label="Dashboard" />
    <SidebarButton path="/posts" icon={<Article />} label="Posts" />
    <SidebarButton path="/write" icon={<Edit />} label="Write" />
    <SidebarButton path="/images" icon={<Gallery />} label="Images" />
    <SidebarButton path="/settings" icon={<Configure />} label="Settings" />
  </Nav>
);


export default function DefaultLayout({
  title,
  children,
  onLogout
}) {

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
        <Header pad="medium" border="bottom">
          <Heading size="small" pad="small" margin="none" level={1}>{title}</Heading>
          <Box>
            <Button onClick={onLogout}>Logout</Button>
          </Box>
        </Header>

        <Main
          pad="large"
          justify="start"
          align="center"
          alignContent="start"
          fill={false}
        >
          <Message />
          {children}
        </Main>
      </Box>

      <Box gridArea="sidebar" direction="row">
        <Sidebar responsive={true} background="neutral-2"  pad="medium">
          <Image src={`/${logo}`} width={200} />
          <MainNavigation />
        </Sidebar>
      </Box>

    </Grid>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  onLogout: PropTypes.func
}


