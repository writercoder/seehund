import React from 'react';

import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';

export default class extends React.Component {

  render() {
    return (
      <Split flex="left">
        <Sidebar colorIndex="brand" size="medium">
          <Header pad='medium' justify='between'>
            <Title>
              Seehund Blog Admin
            </Title>
          </Header>
        </Sidebar>
        <Box pad="large" align="start" alignSelf="start" alignContent="start" full={ true } justify="start">
          { this.props.children }
        </Box>
      </Split>
    );
  }
}
