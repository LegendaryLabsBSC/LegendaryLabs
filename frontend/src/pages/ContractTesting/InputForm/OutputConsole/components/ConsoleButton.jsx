import React from 'react'
import { IconButton, Tooltip } from '@chakra-ui/react'

const ConsoleButton = (props) => {
  return (
    <Tooltip
      label={props.tooltipLabel}
      fontSize="md"
      placement={props.tooltipPlacement}
      bg="blue.500"
      hasArrow
    >
      <IconButton
        icon={props.icon}
        background="none"
        _hover="none"
        onClick={props.onClick}
      />
    </Tooltip>
  )
}

export default ConsoleButton
