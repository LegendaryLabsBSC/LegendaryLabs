import { Text, Link, Heading, Icon } from '@chakra-ui/react'
import { FiDownload } from 'react-icons/fi'

const homeConfig = {
  mainTitle: "Legendary's Contract Testing Lab",
  welcomePanel: {
    title: "Welcome To The Testing Lab!",
    blurb: [
      <Text>
        Here you can <b>directly</b> <i>speak</i> to the project's smart contract bundle!
        Keyword here being directly, the Testing- Lab DApp parses the contract ABI outputted when the smart contracts are compiled.
        This ensures when testing with this DApp, the contract calls are executed exactly as written,
        without any additional safe guards or gamification
        that will be put in place with the Official DApp.
      </Text>,
      <Text>
        Keep this in mind while testing, as some functions on the Official DApp
        will have set parameters than can not be specified by the end user.
        While the call may work fine with the game's specified parameters
        anyone at anytime can directly query the project's contract bundle.
      </Text>,
      <Text>
        This also allows for painless updates of the contract testing interface,
        as every time changes are merged into the smart contracts (prior to launch)
        the Testing-Lab will automatically update as needed.
      </Text>
    ]
  },
  infoPanel: {
    title: "Welcome To The Testing Lab!",
    blurb: []
  },
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
  subpanel: [
    {
      blurb: [
        [
          <Text>
            To use the Testing Lab you will need to install the
          </Text>,
          <Text>
            To add a new Testnet to Metamask:
            Click your account icon inside the MetaMask extension. Then navigate to Settings &rarr; Networks &rarr; Add A Network.
          </Text>
        ],
      ]
    },
    {
      blurb: [
        <Text>
          The Testing-Lab includes a output console, while testing the contracts any questionable, problematic, or otherwise concerning output can easily be saved
          into a text file by clicking Download Log <Icon as={FiDownload} color="green.400" />. The file can then be emailed to ### for ... . A more direct method of submitting
          output-logs will be released in a future update.
        </Text>
      ]
    },
    {
      blurb: [
        <Text>
          More resources and certification guides will be be added here shortly.
          I plan to include guides that will walk the tester through the flow of the contract functionalities.
          In addition to testing following the guides, simply calling the contract functions with the mindset of exploiting
          them is encouraged. For any potential issues or exploits discovered please email a log and discription of the issue to ###.
        </Text>,
        <Text>
          Report Issues & Bugs: development@legendarylabs.net
          Main Repo: https://github.com/LegendaryLabsBSC/LegendaryLabs
          Testing-Lab Repo: https://github.com/LegendaryLabsBSC/Testing-Lab
          Docs: https://docs.legendarylabs.net
          DApp: http://legendarylabs.net
          Telegram: https://t.me/LegendaryLabsTesting

        </Text>
      ]
    }
  ],
  softwareLink: {
    metamask:
      <Link
        isExternal
        href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
        style={{ textDecoration: 'none' }}
        color="blue.500"
      >
        MetaMask Chrome Extension
      </Link>
  },
}

export default homeConfig;