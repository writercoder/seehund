import React from 'react';
import {inject, observer} from 'mobx-react'
import Box from 'grommet/components/Box';
import Notification from 'grommet/components/Notification';

@inject("userStore")
@observer
export default class LoginError extends React.Component {

  render() {
    const error = this.props.userStore.loginError;
    return (
      <Box>
        { error &&
            <Notification message={error.message} status="critical" /> }
      </Box>
    );
  }
}
