import React from 'react'
import { Flex, Box } from '@chakra-ui/react'

const Settings = (props) => {
  return (
    <Flex
      wrap="wrap"
    >
      <Flex
        boxShadow="0 4px 12px rgba(0,0,0,0.75)"
        borderRadius={30}
        flexDirection="column"
        ml={10}
        h="15vh"
        mt="2.5vh"
        w="75vw"
        background="white"
      >
      </Flex>

      <Flex
        boxShadow="0 4px 12px rgba(0,0,0,0.75)"
        borderRadius={30}
        flexDirection="column"
        ml={10}
        h="65vh"
        mt="2.5vh"
        w="75vw"
        background="white"
      >
      </Flex>
    </Flex>


  )
}

export default Settings
