import React from 'react'
import homeConfig from './config/home-config'
import WelcomePanel from './components/WelcomePanel'
import ConnectionHowTo from './components/ConnectionHowTo'
import SimpleSubpanel from './components/SimpleSubpanel'
import { Flex, Heading, } from '@chakra-ui/react'


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
      ml={10}
      mt={5}
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
      >
        <Flex
          id="mainPanel"
          h="100%"
          w="65%"
          flexDir="column"
        >
          <WelcomePanel
            title={homeConfig.welcomePanel.title}
            blurb={homeConfig.welcomePanel.blurb}
          />
          <Flex>
            <Flex
              ml={3}
              pr={2}
              w="100%"
              flexDir="column"
              borderRightWidth={1}
              borderRightColor="black"
            >
              <SimpleSubpanel
                id="certs"
                title={homeConfig.subtitle({ title: "Testing Certs" })}
                body={homeConfig.subpanel.certs}
              />
            </Flex>
            <Flex
              ml={3}
              pr={2}
              w="100%"
              flexDir="column"
            >
              <SimpleSubpanel
                id="logs"
                title={homeConfig.subtitle({ title: "Testing Logs" })}
                body={homeConfig.subpanel.logs}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          id="auxPanel"
          h="100%"
          w="35%"
        >
          <Flex
            borderLeftWidth={1}
            borderLeftColor="black"
            flexDir="column"
          >
            <ConnectionHowTo
              title={homeConfig.subtitle({ title: "Connecting With MetaMask" })}
              blurb={homeConfig.subpanel.metamask}
              installLink={homeConfig.softwareLink.metamask}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home
