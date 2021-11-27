import React, { useState, lazy } from 'react'
import { Avatar, Divider, Flex, Heading, IconButton, Spacer, Text, Box } from '@chakra-ui/react'
import { FiMenu, FiHome, FiSettings} from "react-icons/fi";
import NavItem from "./components/NavItem"
import {
  BrowserRouter as Router,
  Route,
  Link as RouteLink
} from "react-router-dom";
import { GrDocumentTest } from "react-icons/gr"


const Sidebar = () => {
  const [navSize, changeNavSize] = useState("large")

  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      mt="2.5vh"
      boxShadow="0 6px 12px rgba(49,130,206,1)"
      borderRadius={navSize === "small" ? "15px" : "30px"}
      w={navSize === "small" ? "100px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
      // background="blue.600"

    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        as="nav"
        h="100%"
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: 'none' }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize === "small")
              changeNavSize("large")
            else
              changeNavSize("small")
          }}
        />

        <RouteLink to="/">
          <NavItem navSize={navSize} icon={FiHome} title="Home" />
        </RouteLink>
        <RouteLink to="/contract-testing">
          <NavItem navSize={navSize} icon={GrDocumentTest} title="Contract Testing" />
        </RouteLink>
        <Spacer />
        <RouteLink to="settings">
          <NavItem navSize={navSize} icon={FiSettings} title="Settings" />
        </RouteLink>

      </Flex>


      <Flex
        p="5%"
        flexDirection="column"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize === "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">
          <Avatar size="sm" src="gavin.png" />
          <Flex flexDir="column" ml={4} display={navSize === "small" ? "none" : "flex"}>
            <Heading as="h3" size="sm">Gavin Sproles</Heading>
            <Text color="gray">Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Sidebar
