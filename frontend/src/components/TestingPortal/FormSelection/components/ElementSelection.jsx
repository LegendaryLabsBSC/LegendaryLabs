import React from 'react'
import formJSON from '../../InputForm/formElement.json'
import { Button, SimpleGrid } from '@chakra-ui/react'

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

          < Button
            size="md"
            fontSize={11}
            {...setColorScheme(page.theme)}
            onClick={() => handleOnClick(i)}
            boxShadow="0 4px 12px rgba(0,0,0,0.55)"
          >
            {page.page_label}
          </Button>
        )
      }
    </SimpleGrid >
  )
}

export default ElementSelection
