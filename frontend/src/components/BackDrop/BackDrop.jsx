import React from 'react'
import { Flex, } from "@chakra-ui/react";

const BackDrop = (props) => {
  return (
    <Flex
      h="95vh"
      w={props.navSize === "small" ? "87vw" : "80vw"}
      mr={props.navSize === "small" ? "3%" : "4%"}
      mt="2.5vh"
      borderRadius={"30px"}
      boxShadow="0 4px 12px rgba(0,0,0,1)"
      background="blue.500"
      justifyContent="space-between"
    >
      {props.children}
    </Flex>
  )
}

export default BackDrop
