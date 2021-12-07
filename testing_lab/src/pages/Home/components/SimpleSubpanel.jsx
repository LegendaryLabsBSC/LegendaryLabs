import React from 'react'
import { Flex } from '@chakra-ui/react'

const SimpleSubpanel = (props) => {
  return (
    <Flex
      h="100%"
      w="100%"
      flexDir="column"
      alignItems="center"
    >
      {props.title}
      <Flex
        h="100%"
        w="100%"
        textAlign="left"
      >
        {props.body}
      </Flex>
    </Flex>
  )
}

export default SimpleSubpanel