import React from 'react'
import { FiDownload } from 'react-icons/fi'
import homeConfig from './config/home-config'
import {
  Flex,
  Heading,
} from '@chakra-ui/react'
import WelcomePanel from './components/WelcomePanel/WelcomePanel'
import InfoPanel from './components/InfoPanel/InfoPanel'



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
        h="100%"
        w="100%"
      >
        <Flex
          id="mainPanel"
          h="100%"
          w="100%"
        >
          <WelcomePanel
            title={homeConfig.welcomePanel.title}
            subtitle={
              [
                homeConfig.subtitle({ title: "Connecting With MetaMask" }),
                homeConfig.subtitle({ title: "Testing Logs" })
              ]
            }
            blurb={
              [
                [
                  homeConfig.welcomePanel.blurb[0],
                  homeConfig.welcomePanel.blurb[1],
                  homeConfig.welcomePanel.blurb[2]
                ],
                [
                  homeConfig.subpanel[0].blurb[0][0],
                  homeConfig.softwareLink.metamask,
                  homeConfig.subpanel[0].blurb[0][1]
                ],
                homeConfig.subpanel[1].blurb[0]
              ]
            }
          />
        </Flex>
        <Flex
          id="auxPanel"
          h="100%"
          w="65%"
        >
          <InfoPanel
            title={homeConfig.subtitle({ title: "Other Resources" })}
            blurb={
              [
                [
                  homeConfig.subpanel[2].blurb[0],
                ],
                [
                  homeConfig.subpanel[2].blurb[1],
                ],
              ]
            }
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home
