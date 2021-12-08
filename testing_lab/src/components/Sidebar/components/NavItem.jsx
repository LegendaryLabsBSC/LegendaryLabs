import React from 'react'
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
} from '@chakra-ui/react'

const NavItem = (props) => {
  return (
    <Flex
      mt={30}
      w="100%"
      flexDir="column"
      alignItems={props.navSize === "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          p={3}
          w={props.navSize === "large" && "100%"}
          borderRadius={8}
          _hover={{ textDecor: 'none', backgroundColor: 'blue.500' }}
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