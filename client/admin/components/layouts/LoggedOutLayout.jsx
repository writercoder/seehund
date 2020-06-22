import React from 'react';

import { Box, Main, Sidebar, Header, Heading } from 'grommet'

export default function LoggedOutLayout(props) {
  return (
    <Box alignContent="center">
      <Sidebar color="brand">
        <Header>
          <Heading>
            Seehund Blog Admin
          </Heading>
        </Header>
      </Sidebar>
      <Main>
        { props.children }
      </Main>
    </Box>
  );
}
