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
} from '@chakra-ui/react'

const ConnectionHowTo = (props) => {
  return (

    <Flex
      h="100%"
      w="100%"
      flexDir="column"
      alignItems="center"
    >
      {props.subtitle}
      <Flex
        p={1}
        pr={2}
        ml={2}
      >
        <Flex flexDir="column">
          {props.blurb}
        </Flex>
      </Flex>


      <Accordion
        // h="100%"
        // w="100%"
        defaultIndex={2}
      >
        <AccordionItem>
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
        <AccordionItem>
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
                Report Issues To: <a href="mailto:development@legendarylabs.net"> Devs </a>
              </ListItem>
              <ListItem>
                <Link
                  isExternal
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                  style={{ textDecoration: 'none' }
                  }
                  color="blue.500"
                >
                  Main Repo: https://github.com/LegendaryLabsBSC/LegendaryLabs
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  isExternal
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                  style={{ textDecoration: 'none' }
                  }
                  color="blue.500"
                >
                  Testing-Lab Repo: https://github.com/LegendaryLabsBSC/Testing-Lab
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  isExternal
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                  style={{ textDecoration: 'none' }
                  }
                  color="blue.500"
                >
                  Docs: https://docs.legendarylabs.net
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  isExternal
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                  style={{ textDecoration: 'none' }
                  }
                  color="blue.500"
                >
                  DApp: http://legendarylabs.net
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  isExternal
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                  style={{ textDecoration: 'none' }
                  }
                  color="blue.500"
                >
                  Telegram: https://t.me/LegendaryLabsTesting
                </Link>
              </ListItem>
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  )
}

export default ConnectionHowTo
