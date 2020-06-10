import React from 'react';

import Grid from 'grommet/components/Grid';
import { Box, Main, Sidebar, Header, Heading } from 'grommet'
// import Main from 'grommet/components/Main'
// import Sidebar from 'grommet/components/Sidebar';
// import Heading from 'grommet/components/Heading';
// import Header from 'grommet/components/Header'


console.log(Box)

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
