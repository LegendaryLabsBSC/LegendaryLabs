import React from 'react'
import { IconButton, Tooltip } from '@chakra-ui/react'

const TooltipButton = (props) => {
  return (
    <Tooltip
      label={props.tooltipLabel}
      fontSize="sm"
      placement={props.tooltipPlacement}
      bg="blue.500"
      hasArrow
    >
      <IconButton
        icon={props.icon}
        background="none"
        _hover="none"
        onClick={props.onClick}
        size="sm"
      />
    </Tooltip>
  )
}

export default TooltipButton
