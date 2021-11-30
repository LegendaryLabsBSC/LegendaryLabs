import React from 'react'
import {
  Container,
  Flex,
  Text,
  Heading
} from "@chakra-ui/react";

const OutputConsole = (props) => {

  return (
    <Flex
      w={props.navSize === "small" ? "32vw" : "24vw"}
      ml=".5vw"
      h="27vh"
      mt="1vh"
      boxShadow="0 4px 12px rgba(49,130,206,0.55) inset"
      borderRadius={15}
      overflowY={props.outputContent.length > 1 ? "scroll" : "hidden"}
      overflowX={"hidden"}
    >
      <Container >
        <Heading
          as='h5'
          size='sm'
          mt={2}
        >
          Smart Contract Response Log:
        </Heading>
        {
          props.outputContent.length > 1 ?
            props.outputContent.map((line, key) => {
              return (
                <Text
                  key={key}
                  fontSize="sm"
                  ml={2}
                  p={2}
                >
                  {line}
                </Text>
              )
            }) : null
        }
      </Container >
    </Flex >
  )
}

export default OutputConsole
