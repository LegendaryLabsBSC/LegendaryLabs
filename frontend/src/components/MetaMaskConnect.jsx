import React, { useState } from 'react'
import { Button, Flex, Icon, Text } from '@chakra-ui/react'
import { IoWallet } from 'react-icons/io5'


const MetaMaskConnect = () => {

  const [walletAddress, setWalletAddress] = useState([0])

  const testNetwork = { name: 'Harmony Testnet', chainId: '0x6357d2e0' }

  const handleDisplayAddress = (address) => {
    const displayAddress = walletAddress != 0 ?
      `${address.slice(0, 4)}...${address.slice(-4)}`
      : 'Connect'

    return displayAddress
  }

  const connectWallet = async () => {
    if (window.ethereum) {

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });

      if (chainId != testNetwork.chainId) {
        alert(`Please connect to ${testNetwork.name}`);
      } else {
        const wallet = accounts[0];
        setWalletAddress(wallet);
      }
    } else {
      alert("Please install MetaMask");
    }
  }
  return (
    <Flex
      mt={5}
      align="center"
    >
      <Icon
        size="lg"
        as={IoWallet}
        w="20%"
        h="80%"
      />
      < Button
        onClick={connectWallet}
        background="none"
        _hover={{ background: 'none' }}
        borderWidth={3}
        borderColor="blue.500"
        borderRadius={30}
        h="95%"
        w="100%"
        left={3}
      >
        <Text
          fontSize="md"
          color="blue.500"
        >
          {handleDisplayAddress(walletAddress)}
        </Text>
      </Button >
    </Flex>
  );
}

export default MetaMaskConnect
