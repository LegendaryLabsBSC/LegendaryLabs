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
        flexDir="column"
      >
        {props.blurb[0]}
      </Flex>
      <Flex
        h="100%"
        w="100%"
      >
        <Flex
          h="100%"
          w="100%"
          id="subpanel0"
          flexDir="column"
          alignItems="center"
        >
          {props.subtitle[0]}
          <Flex>
            <Flex flexDir="column">
              {props.blurb[1]}
            </Flex>
          </Flex>
          <ConnectionHowTo />
        </Flex>
        <SimpleSubpanel
          title={props.subtitle[1]}
          body={props.blurb[2]}
        />
      </Flex>
    </Flex>
  )
}

export default WelcomePanel
