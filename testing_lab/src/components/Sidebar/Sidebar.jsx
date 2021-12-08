import React from 'react'
import NavItem from "./components/NavItem"
import MetaMaskConnect from '../MetaMaskConnect/MetaMaskConnect';
import { Link as RouteLink } from "react-router-dom";
import { FiMenu, FiHome, FiSettings } from "react-icons/fi";
import { GrDocumentTest } from "react-icons/gr"
import { Divider, Flex, IconButton, Spacer, Badge } from '@chakra-ui/react'


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
          <NavItem
            title="Home"
            icon={FiHome}
            navSize={props.navSize}
          />
        </RouteLink>
        <RouteLink to="/contract-testing">
          <NavItem
            title="Contract Testing"
            icon={GrDocumentTest}
            navSize={props.navSize}
          />
        </RouteLink>
        {/* <Spacer />
        <RouteLink to="settings">
          <NavItem
            title="Settings"
            icon={FiSettings}
            navSize={props.navSize}
          />
        </RouteLink> */}
      </Flex>
      <Flex
        p="5%"
        mb={4}
        w="100%"
        flexDirection="column"
        alignItems="center"
      >
        <Divider
          display={props.navSize === "small" ? "none" : "flex"}
        />
        <Flex
          mt={1.5}>
          {/* <Badge backgroundColor="#02f2d5" color="#2535a0">Harmony</Badge> */}
          <Badge backgroundColor="#fcd535">Binance</Badge>
        </Flex>
        <MetaMaskConnect navSize={props.navSize} />
      </Flex>
    </Flex>
  )
}

export default Sidebar
