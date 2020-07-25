import React from "react";
import PropTypes from 'prop-types'
import {Box} from "grommet";
import {StatusCritical, StatusGood, StatusInfo, StatusWarning} from "grommet-icons";

const iconMap = {
  success: StatusGood,
  critical: StatusCritical,
  warning: StatusWarning
}


const backgroundMap = {
  success: 'status-ok',
  critical: 'status-error',
  warning: 'status-warning'
}


export default function MessageBox({level, children}) {
  const StatusIcon = iconMap[level]
  console.log({level, children, StatusIcon})
  return (
    <Box
      direction="row"
      align="center"
      elevation="small"
      pad={{ vertical: `xsmall`, left: `medium` }}
      round
      width="large"
      gap="small"
      background={ backgroundMap[level] }
    >
      <StatusIcon/>
      {children}
    </Box>
  )
}

MessageBox.propTypes = {
  text: PropTypes.node.isRequired,
  level: PropTypes.oneOf(['success', 'critical', 'warning']).isRequired
}