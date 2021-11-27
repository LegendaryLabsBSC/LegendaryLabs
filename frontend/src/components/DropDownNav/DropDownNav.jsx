import React from 'react'
import { MenuButton } from '@chakra-ui/react'

const DropDownNav = (props) => {
  const onHover = props.hover ? props.hover : "none"

  return (
    <MenuButton
      as={Button}
      leftIcon={<FiFileText />}
      background="none"
      color="blue.500"
      _hover={{ background: onHover }}
    // _pressed={{ background: 'none' }}

    >
      {props.title}
    </MenuButton>
  )
}

export default DropDownNav
