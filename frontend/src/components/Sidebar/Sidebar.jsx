import React, { useState, lazy } from 'react'
import { Avatar, Divider, Flex, Heading, IconButton, Spacer, Text, Box } from '@chakra-ui/react'
import { FiMenu, FiHome, FiSettings, FiFileText, FiFile } from "react-icons/fi";
import NavItem from "./components/NavItem"
import { Router, Link} from "@reach/router";

// const Home = lazy(() => import('../../pages/ContractSelection/ContractSelection'))


const Sidebar = () => {
  const [navSize, changeNavSize] = useState("large")

  return (
    <Flex
      pos="sticky"
      left="5"
      // h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px rgba(0,0,0,0.15)"
      borderRadius={navSize === "small" ? "15px" : "30px"}
      w={navSize === "small" ? "100px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
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
        <NavItem navSize={navSize} icon={FiHome} title="Home" route={"/home"} />
        <NavItem navSize={navSize} icon={FiFileText} title="Contracts" route={"/contractselection"} />
        <Spacer />
        <NavItem navSize={navSize} icon={FiSettings} title="Settings" route={"/settings"} />
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
