import React from 'react'
import homeConfig from './config/home-config'
import WelcomePanel from './components/WelcomePanel/WelcomePanel'
import InfoPanel from './components/InfoPanel/InfoPanel'
import {
  Flex,
  Heading,
  HStack,
} from '@chakra-ui/react'
import ConnectionHowTo from './components/WelcomePanel/components/ConnectionHowTo'
import SimpleSubpanel from './components/SimpleSubpanel'


const Home = (props) => {

  const MainTitle = () => (
    <Flex
      flexDir="column"
      alignItems="center"
    >
      <Heading
        p={4}
        pb={1}
        as='h1'
        color="white"
        fontSize="4rem"
        fontFamily="Georgia"
        letterSpacing={-1}
        background="blue.500"
        borderBottomRadius={22}
      >
        {homeConfig.mainTitle}
      </Heading>
    </Flex>
  )

  return (
    <Flex
      mt="2.5vh"
      ml={10}
      h="90vh"
      w={props.navSize === "small" ? "82vw" : "75vw"}
      background="white"
      borderRadius={30}
      boxShadow="0 4px 12px rgba(0,0,0,0.75)"
      flexDirection="column"
    >
      <MainTitle />
      <Flex
        id="body"
        mt={1}
        h="100%"
        w="100%"

        borderWidth={3}
        borderColor="purple"
      >

        <Flex
          flexDir="column"
          h="100%"
          w="65%"

          borderWidth={3}
          borderColor="cyan"
        >

          <Flex
            id="mainPanel"
            h="100%"
            w="100%"
            borderWidth={3}
            borderColor="red"
          >
            <WelcomePanel
              title={homeConfig.welcomePanel.title}
              blurb={homeConfig.welcomePanel.blurb}
            />
          </Flex>


          <Flex
            h="100%"
            w="100%"
            // flexDir="column"

            borderWidth={3}
            borderColor="green"
          >

            <Flex
              h="100%"
              w="100%"
              flexDir="column"

              borderWidth={3}
              borderColor="silver"
            >
              <SimpleSubpanel
                title={homeConfig.subtitle({ title: "Testing Certs" })}
                body={homeConfig.subpanel.certs}
              />
            </Flex>
            <Flex
              h="100%"
              w="100%"
              flexDir="column"

              borderWidth={3}
              borderColor="yellow"
            >
              <SimpleSubpanel
                title={homeConfig.subtitle({ title: "Testing Logs" })}
                body={homeConfig.subpanel.resources}
              />
            </Flex>
          </Flex>
        </Flex>

        <Flex
          id="auxPanel"
          h="100%"
          w="35%"

          borderWidth={3}
          borderColor="black"
        >
          <Flex
            flexDir="column"
          >
            <ConnectionHowTo
              title={homeConfig.welcomePanel.title}
              subtitle={homeConfig.subtitle({ title: "Connecting With MetaMask" })}
              blurb={homeConfig.subpanel.metamask}
            />
          </Flex>
        </Flex>


      </Flex>
    </Flex>
  )
}

export default Home
