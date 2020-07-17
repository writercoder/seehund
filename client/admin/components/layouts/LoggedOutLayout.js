import React from 'react';

import { Box, Main, Sidebar, Header, Heading } from 'grommet'

export default function LoggedOutLayout(props) {
  return (
    <Box align="center">
      <Header>
        <Heading>
          Seehund Blog Admin
        </Heading>
      </Header>
      <Main pad="large">
        { props.children }
      </Main>
    </Box>
  );
}
