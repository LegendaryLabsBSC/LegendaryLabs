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
} from '@chakra-ui/react'

const ConnectionHowTo = () => {
  return (
    <Accordion
      h="100%"
      w="100%"
      defaultIndex={0}
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
  )
}

export default ConnectionHowTo
