import React from 'react'
import { FiDownload } from 'react-icons/fi'
import homeConfig from './config/home-config'
import {
  Flex,
  Box,
  Heading,
  Stack,
  Divider,
  Text,
  Icon,
  Link,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spacer,
} from '@chakra-ui/react'


const Home = (props) => {

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
      <Flex
        h="100%"
        w="100%"
      >


        <Flex
          h="100%"
          w="100%"
        >
          <Flex
            flexDir="column"
            alignItems="center"
            h="100%"
            w="100%"
          >
            <Heading
              p={2}
              w="100%"
              textAlign="center"
              as='h2'
              fontSize="3xl"
            >
              {homeConfig.welcomePanel.welcomeTitle}
            </Heading>
            <Flex
              flexDir="column"
            >
              {homeConfig.welcomePanel.blurb[0]}
              {homeConfig.welcomePanel.blurb[1]}
              {homeConfig.welcomePanel.blurb[2]}
            </Flex>

            <Flex
              h="100%"
              w="100%"

            >


              <Flex
                flexDir="column"
                alignItems="center"
                h="100%"
                w="100%"

              >
                {homeConfig.subPanel[0].title}
                <Flex

                  // borderWidth={3}
                  // borderColor="cyan"
                >
                  <Flex
                    flexDir="column"
                  >
                    {homeConfig.subPanel[0].blurb[0][0]}
                    {homeConfig.softwareLink.metamask}
                    {homeConfig.subPanel[0].blurb[0][1]}
                  </Flex>
                </Flex>

                <Accordion
                  h="100%"
                  w="100%"
                  defaultIndex={0}

                  // borderWidth={3}
                  // borderColor="maroon"
                >
                  <AccordionItem
                  >
                    <AccordionButton>
                      <Heading
                        as="h4"
                        fontSize="md"
                      >
                        Connect To <Badge backgroundColor="#02f2d5" color="#2535a0" m={0, 1}>Harmony</Badge> Testnet
                      </Heading>
                      <Spacer />
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      Fill out the form as follows:

                      Network Name: Harmony Testnet
                      New RPC URL: https://api.s0.b.hmny.io
                      Chain ID: 1666700000
                      Currency Symbol: ONE
                      Block Explorer URL: https://explorer.testnet.harmony.one/
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Heading
                        as="h4"
                        fontSize="md"
                      >
                        Connect To <Badge backgroundColor="#fcd535" m={0, 1}>Binance</Badge> Testnet
                      </Heading>
                      <Spacer />
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      Fill out the form as follows:

                      Network Name: BSC Testnet
                      New RPC URL: https://data-seed-prebsc-2-s2.binance.org:8545/
                      Chain ID: 97
                      Currency Symbol: BNB
                      Block Explorer URL: https://testnet.bscscan.com/
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>







              <Flex
                flexDir="column"
                alignItems="center"
                h="100%"
                w="100%"

                // borderWidth={3}
                // borderColor="green"
              >
                <Heading
                  p={1}
                  as='h3'
                  fontSize="2xl"
                  w="100%"
                  textAlign="center"

                  // borderWidth={3}
                  // borderColor="magenta"
                >
                  Testing Logs
                </Heading>
                <Flex>
                  <Text>
                    The Testing-Lab includes a output console, while testing the contracts any questionable, problematic, or otherwise concerning output can easily be saved
                    into a text file by clicking Download Log <Icon as={FiDownload} color="green.400" />. The file can then be emailed to ### for ... . A more direct method of submitting
                    output-logs will be released in a future update.
                  </Text>
                </Flex>
              </Flex>


            </Flex>
          </Flex>
        </Flex>

        <Flex
          h="100%"
          w="65%"

          borderWidth={3}
          borderColor="orange"
        >
          <Flex
            // mt={4}
            flexDir="column"
            alignItems="center"
            h="100%"
            w="100%"
            borderWidth={3}
            borderColor="brown"
          >
            <Heading
              p={2}
              // pb={1}
              as='h2'
              w="100%"
              textAlign="center"
              // color="white"
              fontSize="2xl"
              // fontFamily="Georgia"

              borderWidth={3}
              borderColor="blue"
            >
              {/* {props.label} */}
              Other Resources
            </Heading>

            <Flex
              h="100%"
              w="100%"
              flexDir="column"
              alignItems="center"

              borderWidth={3}
              borderColor="green.200"
            >


              <Flex
                h="100%"
                w="100%"

                borderWidth={3}
                borderColor="gold"
              >
                <Text>
                  More resources and certification guides will be be added here shortly.
                  I plan to include guides that will walk the tester through the flow of the contract functionalities.
                  In addition to testing following the guides, simply calling the contract functions with the mindset of exploiting
                  them is encouraged. For any potential issues or exploits discovered please email a log and discription of the issue to ###.
                </Text>
              </Flex>

              <Flex
                h="100%"
                w="100%"

                borderWidth={3}
                borderColor="silver"
              >
                <Text>
                  Report Issues & Bugs: development@legendarylabs.net
                  Main Repo: https://github.com/LegendaryLabsBSC/LegendaryLabs
                  Testing-Lab Repo: https://github.com/LegendaryLabsBSC/Testing-Lab
                  Docs: https://docs.legendarylabs.net
                  DApp: http://legendarylabs.net
                  Telegram: https://t.me/LegendaryLabsTesting

                </Text>
              </Flex>

            </Flex>
          </Flex>
        </Flex>


      </Flex>



    </Flex>
  )
}

export default Home
