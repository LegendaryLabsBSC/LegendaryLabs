import React, { useState, useEffect } from 'react'
import formJSON from '../../InputForm/formElement.json'
import { Button, SimpleGrid, Flex } from '@chakra-ui/react'
import SmartContracts from '../../SmartContracts/SmartContracts'

//todo: button color

const ElementSelection = (props) => {

  // const contractABI[] = props.contract.abi.map
  // const { tss } = props
  const [contractABI, setContractABI] = useState(null);

  useEffect(() => {
    setContractABI(SmartContracts[0])
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

      case "write":
        return {
          colorScheme: "red"
        }

      case "read":
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
    <SimpleGrid columns={4} spacing={5} >
      {
        props.contract && props.contract.abi && props.contract.abi.map((page, i) =>
        // props.contract.map((page, i) =>
        // contractABI.map((page, i) =>
        // SmartContracts[0].map((page, i) =>
        // props.contract.abi.map((page, i) =>
        // formJSON.map((page, i) =>
        // SmartContracts.map((page, i) =>
        // page.abi.map((page, i) =>
        (
          // c.name ?
          < Button
            size="md"
            fontSize={11}
            {...setColorScheme(page.theme)}
            onClick={() => handleOnClick(i)}
            boxShadow="0 4px 12px rgba(0,0,0,0.55)"
          >
            {/* {c.name} */}
            {page.name}
          </Button>
          // : null
        )
        )
        // )
      }
    </SimpleGrid >
  )
}

export default ElementSelection
