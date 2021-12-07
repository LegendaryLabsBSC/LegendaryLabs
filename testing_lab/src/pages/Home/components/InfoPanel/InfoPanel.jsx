import React from 'react'
import {
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react'

const InfoPanel = (props) => {
  return (
    <Flex
      // mt={4}
      h="100%"
      w="100%"
      flexDir="column"
      alignItems="center"
    >
      {props.title}
      <Flex
        h="100%"
        w="100%"
        flexDir="column"
        alignItems="center"
      >
        <Flex
          h="100%"
          w="100%"

          flexDir="column"
          alignItems="center"
        >
          {props.blurb[0]}
          <br />
          {props.blurb[1]}
        </Flex>
      </Flex>
    </Flex>

  )
}

export default InfoPanel
