import React from 'react'
import {
  Container,
  Flex, Textarea
} from "@chakra-ui/react";

const OutputConsole = (props) => {
  return (
    <Flex
      // borderWidth={3}
      w={props.navSize === "small" ? "32vw" : "24vw"}
      // w="32vw"
      ml=".5vw"
      h="27vh"
      mt="1vh"
      boxShadow="0 4px 12px rgba(49,130,206,0.55) inset"
      borderRadius={15}
    >
      <Container>

      </Container>
    </Flex>
  )
}

export default OutputConsole
