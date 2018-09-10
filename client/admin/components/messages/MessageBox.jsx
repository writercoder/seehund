import React from 'react';
import {inject, observer} from 'mobx-react'
import Box from 'grommet/components/Box';
import Notification from 'grommet/components/Notification';

@inject("messagesStore")
@observer
export default class MessageBox extends React.Component {
  render() {

    const { messagesStore } = this.props;

    return (
      <Box>
        { messagesStore.messages.map(({id, message, status}) => {
          return <Notification key={id} message={message} status={status} />
        })}
      </Box>
    );
  }
}
