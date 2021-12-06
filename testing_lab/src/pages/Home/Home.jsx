import React from 'react'
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
import { FiDownload } from 'react-icons/fi'


const Home = (props) => {

  const MetaMaskExt = () => (
    <Link
      isExternal
      href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
      style={{ textDecoration: 'none' }}
      color="blue.500"
    >
      MetaMask Chrome Extension
    </Link>
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

    // borderWidth={3}
    // borderColor="purple"
    >
      <Flex
        // mt={4}
        flexDir="column"
        alignItems="center"

      // borderWidth={3}
      // borderColor="red"
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

        // borderWidth={3}
        // borderColor="blue"
        >
          {props.label}
        </Heading>
      </Flex>

      <Flex
        h="100%"
        w="100%"

      // borderWidth={3}
      // borderColor="green"
      >


        <Flex
          h="100%"
          w="100%"

          borderWidth={3}
          borderColor="yellow"
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
              w="100%"
              textAlign="center"
              as='h2'
              // color="white"
              fontSize="3xl"
              // fontFamily="Georgia"

              borderWidth={3}
              borderColor="blue"
            >
              {/* {props.label} */}
              Welcome To The Testing Lab!
            </Heading>
            <Flex>
              <Text>
                Here you can  <b>directly</b>, <i>speak</i> to the project's smart contract bundle!
                Keyword here being directly, the Testing-Lab DApp parses the contract ABI outputted when the smart contracts are compiled.
                This ensures when testing with this DApp, the contract calls are executed exactly as written, without any additional safe guards or gamification
                that will be put in place with the Official DApp.

                * Keep this in mind while testing, as some functions on the Official DApp
                will have set parameters than can not be specified by the end user. While the call may work fine with the game's specified parameters
                anyone at anytime can directly query the project's contract bundle.

                This also allows for painless updates of the contract testing interface, as every time changes are merged into the smart contracts (prior to launch)
                the Testing-Lab will automatically update as needed.


              </Text>
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

                borderWidth={3}
                borderColor="orange"
              >
                <Heading
                  p={1}
                  as='h3'
                  fontSize="2xl"
                  // fontFamily="Georgia"
                  w="100%"
                  textAlign="center"
                  borderWidth={3}
                  borderColor="teal"

                >
                  Connecting With MetaMask
                </Heading>

                <Flex

                  borderWidth={3}
                  borderColor="cyan"
                >
                  <Text>
                    To use the Testing Lab you will need to install the <MetaMaskExt />.
                    {/* Once installed, referer to the <Badge backgroundColor="blue.500" color="white">Testnet Chain</Badge> badge on the Sidebar to see
                    what Testnet the Smart Contract Bundle is currently running on. */}
                    <br />

                    To add a new Testnet to Metamask:
                    Click your account icon inside the MetaMask extension. Then navigate to Settings &rarr; Networks &rarr; Add A Network.
                  </Text>

                </Flex>
                {/* <Flex
                  flexDir="column"
                  alignItems="center"
                  h="100%"
                  w="100%"

                  borderWidth={3}
                  borderColor="maroon"
                > */}

                <Accordion
                  h="100%"
                  w="100%"
                  defaultIndex={0}
                  borderWidth={3}
                  borderColor="maroon"
                >


                  {/* <Flex
                    h="100%"
                    w="100%"

                    borderWidth={3}
                    borderColor="green"
                  > */}

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
                    <AccordionPanel
                    // pb={4}
                    // top={0}
                    >
                      {/* To add the Harmony Testnet to Metamask:
                      Click your account icon inside the MetaMask extension. Then navigate to Settings &rarr; Networks &rarr; Add A Network. */}

                      Fill out the form as follows:

                      Network Name: Harmony Testnet
                      New RPC URL: https://api.s0.b.hmny.io
                      Chain ID: 1666700000
                      Currency Symbol: ONE
                      Block Explorer URL: https://explorer.testnet.harmony.one/
                    </AccordionPanel>
                  </AccordionItem>


                  {/* </Flex> */}

                  {/* <Flex
                    h="100%"
                    w="100%"
                    borderWidth={3}
                    borderColor="purple"
                  > */}

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
                    {/* </Flex> */}
                    {/* </Flex> */}
                    <AccordionPanel>
                      {/* To add the Binance Testnet to Metamask:
                      Click your account icon inside the MetaMask extension. Then navigate to Settings &rarr; Networks &rarr; Add A Network. */}

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

                borderWidth={3}
                borderColor="green"
              >
                <Heading
                  p={1}
                  as='h3'
                  fontSize="2xl"
                  // fontFamily="Georgia"
                  w="100%"
                  textAlign="center"
                  borderWidth={3}
                  borderColor="magenta"
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
