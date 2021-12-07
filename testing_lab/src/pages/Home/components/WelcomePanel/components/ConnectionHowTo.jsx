import React from 'react'
import {
  Heading,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spacer,
  Flex,
  UnorderedList,
  ListItem,
  Container,
  Link,
  Text
} from '@chakra-ui/react'

const ConnectionHowTo = (props) => {
  return (

    <Flex
      h="100%"
      w="100%"
      flexDir="column"
      alignItems="center"
    >
      {props.title}
      <Flex
        p={1}
        pr={2}
        ml={2}
      >
        <Text>
          Install {props.installLink}
          <br />
          To add a new Testnet to Metamask:
          <UnorderedList>
            <br />
            <ListItem>
              Click your account icon inside the MetaMask extension (top-right corner)
            </ListItem>
            <br />
            <ListItem>
              Then navigate to:
              <br />
              Settings &rarr; Networks &rarr; Add A Network
            </ListItem>
          </UnorderedList>
        </Text>
      </Flex>
      <br />
      <Accordion
        h="100%"
        w="100%"
        defaultIndex={2}

      >
        <AccordionItem
          w="100%"
        >
          <AccordionButton
          // w="50%"
          >
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
          // h="100%"
          // w="100%"
          // overflowY="scroll"
          >
            <Heading
              as="h5"
              fontSize="md"
              color="#02f2d5"
            >
              Fill out the form as follows:
            </Heading>

            Network Name: Harmony Testnet
            <br />
            New RPC URL: https://api.s0.b.hmny.io
            <br />
            Chain ID: 1666700000
            <br />
            Currency Symbol: ONE
            <br />
            Block Explorer URL: https://explorer.testnet.harmony.one/
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem
          w="100%"
        >
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
            <Heading
              as="h5"
              fontSize="md"
              color="#fcd535"
            >
              Fill out the form as follows:
            </Heading>

            Network Name: BSC Testnet
            <br />
            New RPC URL: https://data-seed-prebsc-2-s2.binance.org:8545/
            <br />
            Chain ID: 97
            <br />
            Currency Symbol: BNB
            <br />
            Block Explorer URL: https://testnet.bscscan.com/
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem
          w="100%"
        >
          <AccordionButton>
            <Heading
              as="h4"
              fontSize="md"
            >
              <Badge backgroundColor="#0f52ba" color="#fcae21" m={0, 1}>Legendary</Badge> Links
            </Heading>
            <Spacer />
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <UnorderedList>
              <ListItem>
                Report Issues To:
                <br />
                development@legendarylabs.net
              </ListItem>
              <ListItem>
                <Link
                  isExternal
                  href="https://github.com/LegendaryLabsBSC/LegendaryLabs"
                  style={{ textDecoration: 'none' }
                  }
                  color="blue.500"
                >
                  Main Repo
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  isExternal
                  href="https://github.com/LegendaryLabsBSC/Testing-Lab"
                  style={{ textDecoration: 'none' }
                  }
                  color="blue.500"
                >
                  Testing Lab Repo (this)
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  isExternal
                  href="https://docs.legendarylabs.net"
                  style={{ textDecoration: 'none' }
                  }
                  color="blue.500"
                >
                Docs Site
              </Link>
            </ListItem>
            <ListItem>
              <Link
                isExternal
                href="http://legendarylabs.net"
                style={{ textDecoration: 'none' }
                }
                color="blue.500"
              >
                DApp
              </Link>
            </ListItem>
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    </Flex >
  )
}

export default ConnectionHowTo
