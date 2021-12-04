import React from 'react'
import { Divider, Flex, IconButton, Spacer } from '@chakra-ui/react'
import { FiMenu, FiHome, FiSettings } from "react-icons/fi";
import NavItem from "./components/NavItem"
import { GrDocumentTest } from "react-icons/gr"
import MetaMaskConnect from '../MetaMaskConnect/MetaMaskConnect';
import { Link as RouteLink } from "react-router-dom";


const Sidebar = (props) => {

  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      mt="2.5vh"
      boxShadow="0 6px 12px rgba(49,130,206,1)"
      borderRadius={props.navSize === "small" ? "15px" : "30px"}
      w={props.navSize === "small" ? "100px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={props.navSize === "small" ? "center" : "flex-start"}
        as="nav"
        h="100%"
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: 'none' }}
          icon={<FiMenu />}
          onClick={() => {
            if (props.navSize === "small")
              props.changeNavSize("large")
            else
              props.changeNavSize("small")
          }}
        />
        <RouteLink to="/">
          <NavItem navSize={props.navSize} icon={FiHome} title="Home" />
        </RouteLink>
        <RouteLink to="/contract-testing">
          <NavItem navSize={props.navSize} icon={GrDocumentTest} title="Contract Testing" />
        </RouteLink>
        <Spacer />
        <RouteLink to="settings">
          <NavItem navSize={props.navSize} icon={FiSettings} title="Settings" />
        </RouteLink>
      </Flex>
      <Flex
        p="5%"
        flexDirection="column"
        w="100%"
        alignItems={props.navSize === "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={props.navSize === "small" ? "none" : "flex"} />
        <MetaMaskConnect navSize={props.navSize} />
      </Flex>
    </Flex>
  )
}

export default Sidebar
