import React from 'react'
import { Flex, Heading, } from '@chakra-ui/react'

const WelcomePanel = (props) => {

  return (
    <Flex
      flexDir="column"
      alignItems="center"
    >
      <Heading
        p={2}
        as='h2'
        w="100%"
        fontSize="3xl"
        textAlign="center"
      >
        {props.title}
      </Heading>
      <Flex
        ml={3}
        pr={4}
        flexDir="column"
        textAlign="justify"
      >
        {props.blurb}
      </Flex>
    </Flex>
  )
}

export default WelcomePanel
