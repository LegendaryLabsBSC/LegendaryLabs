import { Text, Link, Heading } from "@chakra-ui/react";


const homeConfig = {
  mainTitle: "Legendary's Contract Testing Lab",
  welcomePanel: {
    welcomeTitle: "Welcome To The Testing Lab!",
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
  subPanel: [
    {
      title: <Heading
        p={1}
        as='h3'
        fontSize="2xl"
        w="100%"
        textAlign="center"
      >
        Connecting With MetaMask
      </Heading>,
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
      title: "Welcome To The Testing Lab!",
      blurb: []
    }],
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