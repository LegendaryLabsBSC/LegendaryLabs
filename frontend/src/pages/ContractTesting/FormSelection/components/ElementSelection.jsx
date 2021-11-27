import React, { useEffect } from 'react'
import formJSON from '../../InputForm/formElement.json'
import { Button, SimpleGrid, Flex } from '@chakra-ui/react'
import SmartContracts from '../../SmartContracts/SmartContracts'

//todo: button color

const ElementSelection = (props) => {

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
        formJSON.map((page, i) =>
        // SmartContracts.map((page, i) =>
        // page.abi.map((c, e) =>
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
            {page.page_label}
          </Button>
          // : null
        )
          // )
        )
      }
    </SimpleGrid >
  )
}

export default ElementSelection
