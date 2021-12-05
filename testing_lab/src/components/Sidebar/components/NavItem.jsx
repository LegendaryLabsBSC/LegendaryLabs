import React from 'react'
import {
  Flex,
  Link,
  Menu,
  MenuButton,
  Icon,
  Text
} from '@chakra-ui/react'

const NavItem = (props) => {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={props.navSize === "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          p={3}
          borderRadius={8}
          _hover={{ textDecor: 'none', backgroundColor: 'blue.500' }}
          w={props.navSize === "large" && "100%"}
        >
          <MenuButton >
            <Flex>
              <Icon as={props.icon} fontSize="xl" />
              <Text
                ml={5}
                display={props.navSize === "small" ? "none" : "flex"}
              >
                {props.title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex >
  )
}

export default NavItem