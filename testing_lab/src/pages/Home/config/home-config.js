import { FiDownload } from 'react-icons/fi'
import {
  Text,
  Icon,
  Link,
  Heading,
} from '@chakra-ui/react'

const homeConfig = {
  mainTitle: "Legendary's Contract Testing Lab",
  subtitle:
    (props) => (
      <Heading
        p={1}
        as='h3'
        fontSize="2xl"
        w="100%"
        textAlign="center"
      >
        {props.title}
      </Heading>
    ),
  welcomePanel: {
    title: "Welcome To The Testing Lab!",
    blurb: [
      <Text
        mb={2}
      >
        Here you can <b>directly</b> <i>speak</i> to the project's smart contract bundle!
        Keyword being directly, the Testing Lab DApp parses the contract ABI outputted when
        the smart contracts are compiled.This ensures when testing with this DApp,
        the contract calls are executed exactly as written, without any additional safe
        guards or gamification that will be put in place with the Official DApp.
      </Text >,
      <Text
        mb={2}

      >
        Keep this in mind while testing, as some functions on the Official DApp
        will have set parameters than can not be specified by the end user.
        While the call may work fine within the game,anyone at anytime can directly
        query the project's contract bundle.
      </Text>,
      <Text
        mb={2}

      >
        Parsing directly from the contract ABIs also allows for painless updates of the
        contract testing interface. When new changes are merged into the Smart Contracts
        (prior to launch) the Testing Lab will automatically update as needed.
      </Text>
    ]
  },
  subpanel: {
    certs:
      <Text
        lineHeight={7}
      >
        More resources and certification guides will be be added shortly. I plan to 
        include guides that will walk the tester through the flow of the contract functionalities.
        <br /><br />
        In addition to testing following the guides, simply calling the contract functions with the mindset of exploiting
        them is encouraged.
      </Text >,
    logs:
      <Text
        lineHeight={7}
      >
        The Testing Lab includes a built-in output console. While testing the contracts any questionable, problematic, or otherwise concerning output can easily be saved
        into a text file by clicking Download Log <Icon as={FiDownload} color="green.400" />.
        <br /> <br />
        The file can then be emailed to the specified address for analysis.
        A more direct method of submitting output-logs will be released in a future update.
      </Text>
  },
  softwareLink: {
    metamask:
      <Link
        isExternal
        href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
        style={{ textDecoration: 'none' }
        }
        color="blue.500"
      >
        MetaMask Chrome Extension
      </Link >
  },
}

export default homeConfig;