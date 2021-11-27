import React from 'react'
import { Flex } from '@chakra-ui/react'

const ContentContainer = (props) => {
  return (
    <Flex
      pos="sticky"
      left="5"
      mr="4%"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px rgba(0,0,0,1)"
      borderRadius={"30px"}
      w="80vw"
      flexDir="row"
      justifyContent="space-between"
      background="blue.500"
    // alignItems="center"
    >

    </Flex>
  )
}

export default ContentContainer
