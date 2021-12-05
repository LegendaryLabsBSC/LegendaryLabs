import React from 'react'
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption
} from "@chakra-ui/react";

const DropdownMenu = (props) => {

  return (
    <Menu
    >
      <MenuButton
        size="lg"
        as={Button}
        borderRadius={36}
        background="none"
        color={props.color}
        _hover={{ background: 'none' }}
        rightIcon={props.rightIcon ? props.rightIcon : null}
        leftIcon={props.leftIcon ? props.leftIcon : null}
      >
        {props.title}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          type='radio'
          title="Contracts"
        >
          {
            props.menuSource.map((data, index) =>
              <MenuItemOption
                value={`${index}`}
                onClick={() => props.handleOnClick(data, index)}
              >
                {data.contractName}
              </MenuItemOption>
            )
          }
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}

export default DropdownMenu
