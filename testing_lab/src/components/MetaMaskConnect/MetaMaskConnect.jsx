import React, { useState, useEffect } from 'react'
import { IoWallet } from 'react-icons/io5'
import { Button, Flex, Icon, Text, Tooltip, useToast } from '@chakra-ui/react'

// const testNetwork = { name: 'Harmony Testnet', chainId: '0x6357d2e0' }
const testNetwork = { name: 'Binance Testnet', chainId: '0x61' }

const MetaMaskConnect = (props) => {
  const [walletAddress, setWalletAddress] = useState([0])

  const toast = useToast()

  useEffect(() => {
    connectWallet()
  }, [])

  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {

      const [accounts] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });

      if (chainId !== testNetwork.chainId) {
        console.log(chainId)
        alert(`Please connect to ${testNetwork.name}`);
      } else {
        const wallet = await accounts;
        setWalletAddress(wallet);
        toast({
          title: 'Account Connected!',
          description: `You can now use the Lab.`,
          status: 'success',
          variant: 'left-accent',
          duration: 2000,
          position: 'bottom-left',
          isClosable: true,
        })
      }
    } else {
      alert("Please install MetaMask");
    }
  }

  const HandleConnectView = () => (
    props.navSize === "small" ?
      <Button
        ml={1}
        size="sm"
        as={IoWallet}
        background="none"
        onClick={connectWallet}
        _hover={{ background: 'blue.500' }}
      />
      : <>
        <Icon
          ml={1}
          w="20%"
          h="80%"
          size="lg"
          as={IoWallet}
        />
        < Button
          left={3}
          background="none"
          borderWidth={3}
          borderRadius={30}
          borderColor="blue.500"
          onClick={connectWallet}
          _hover={{ background: 'none' }}
        >
          <Text
            fontSize="md"
            color="blue.500"
          >
            {walletAddress > 1 ?
              `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
              : 'Connect'}
          </Text>
        </Button >
      </>
  )

  return (
    <Flex
      mt={5}
      flexDir="column"
    >
      <Tooltip
        hasArrow
        bg="blue.500"
        fontSize={13}
        borderRadius={5}
        shouldWrapChildren
        placement={walletAddress > 1 ? "top-start" : "top"}
        label={walletAddress > 1 ? walletAddress : 'Connect'}
      >
        <Flex>
          <HandleConnectView />
        </Flex >
      </Tooltip>
    </Flex >
  );
}

export default MetaMaskConnect


