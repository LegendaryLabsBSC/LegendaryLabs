import React from 'react'
import {
  Flex,
  Link,
  Menu,
  MenuButton,
  Icon,
  Text
} from '@chakra-ui/react'

const NavItem = ({ navSize, icon, title, active }) => {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          backgroundColor={active && "blue.500"}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: 'none', backgroundColor: 'blue.500' }}
          w={navSize === "large" && "100%"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "grey.500"} />
              <Text ml={5} display={navSize === "small" ? "none" : "flex"}>{title}</Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex >
  )
}

export default NavItem