import React from 'react'
import SimpleSubpanel from '../SimpleSubpanel'
import ConnectionHowTo from './components/ConnectionHowTo'
import {
  Flex,
  Heading,
} from '@chakra-ui/react'

const WelcomePanel = (props) => {

  return (
    <Flex
      h="100%"
      w="100%"
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
      <Flex
        h="100%"
        w="100%"
      >
      </Flex>
    </Flex>
  )
}

export default WelcomePanel
