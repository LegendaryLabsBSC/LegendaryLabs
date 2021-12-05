import React, { useState, useEffect } from 'react'
import { Button, Flex, Icon, Text, Tooltip, useToast } from '@chakra-ui/react'
import { IoWallet } from 'react-icons/io5'


const MetaMaskConnect = (props) => {
  const [walletAddress, setWalletAddress] = useState([])

  const toast = useToast()

  const testNetwork = { name: 'Harmony Testnet', chainId: '0x6357d2e0' }

  const handleDisplayAddress = (address) => {
    if (walletAddress.length > 1) {
      return `${address.slice(0, 4)}...${address.slice(-4)}`
    } else {
      return 'Connect'
    }
  }


  async function connectWallet() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });

      console.log(window.ethereum.address)
      console.log(accounts)

      if (chainId !== testNetwork.chainId) {
        alert(`Please connect to ${testNetwork.name}`);
      } else {
        const wallet = accounts[0];
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
  return (
    <Flex
      mt={5}
      align="center"
      display="flex"
    >
      {props.navSize === "small" ?
        <Tooltip
          label={walletAddress !== 0 && walletAddress}
          placement='auto-start'
          fontSize={13}
          borderRadius={15}
          shouldWrapChildren
        >
          <Button
            size="md"
            as={IoWallet}
            ml={1}
            onClick={connectWallet}
            background="none"
            _hover={{ background: 'blue.500' }}
          />
        </Tooltip> :
        <>
          <Icon
            size="lg"
            as={IoWallet}
            w="20%"
            h="80%"
            ml={1}
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
        </>
      }
    </Flex>
  );
}

export default MetaMaskConnect
