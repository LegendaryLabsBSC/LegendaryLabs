import React from 'react'
import { IconButton, Tooltip } from '@chakra-ui/react'

const TooltipButton = (props) => {
  return (
    <Tooltip
      label={props.label}
      fontSize={props.fontSize}
      placement={props.placement}
      bg="blue.500"
      hasArrow
    >
      <IconButton
        icon={props.icon}
        background="none"
        _hover="none"
        onClick={props.onClick}
        size={props.size}
        color={props.color}
      />
    </Tooltip>
  )
}

export default TooltipButton
