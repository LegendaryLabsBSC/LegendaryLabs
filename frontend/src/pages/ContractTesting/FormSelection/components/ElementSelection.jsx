import React, { useState, useEffect } from 'react'
import formJSON from '../../InputForm/formElement.json'
import { Button, SimpleGrid, Flex, Text } from '@chakra-ui/react'
import SmartContracts from '../../SmartContracts/SmartContracts'

//todo: button color

const ElementSelection = (props) => {

  // const contractABI[] = props.contract.abi.map
  // const { tss } = props
  const [contractABI, setContractABI] = useState(null);

  useEffect(() => {
    setContractABI(SmartContracts[props.contractIndex])
  }, [props.contract])

  const handleABI = () => {

  }

  const handleOnClick = (pageIndex) => {
    props.newPage(pageIndex)
  };

  const setColorScheme = (theme) => {
    switch (theme) {

      case "write-lab":
        return {
          colorScheme: "red",
          borderColor: "black",
          borderWidth: 3,
        }

      case "nonpayable":
        return {
          colorScheme: "red"
        }

      case "view":
        return {
          colorScheme: "blue"
        }

      default:
        return {
          colorScheme: "gray"
        }

    }
  }

  return (
    <Flex
      overflowY="scroll"
      overflowX="hidden"
      h="77vh"
      flexDir="column"
    >
      {/* <SimpleGrid
        columns={4}
        spacingX={3}
        spacingY={2}
      // w="100%"
      > */}

      <Flex
        wrap="wrap" m={1}
        justify="center"
      >
        {
          props.contract &&
          props.contract.abi &&
          props.contract.abi.map((page, i) =>
          (
            (page.name && page.type === "function") ?
              < Button
                size="md"
                fontSize={11}
                {...setColorScheme(page.stateMutability)}
                onClick={() => handleOnClick(i)}
                boxShadow="0 4px 12px rgba(0,0,0,0.55)"
                w="20%"
                m={2}
              >
                <Text fontSize={12}>
                  {page.name}
                </Text>
              </Button>
              : null
          )
          )
        }
        {/* </SimpleGrid > */}
      </Flex>
    </Flex>
  )
}

export default ElementSelection
