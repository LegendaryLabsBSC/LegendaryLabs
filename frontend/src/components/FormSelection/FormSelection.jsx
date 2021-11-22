import React from 'react'
import formJSON from '../InputForm/formElement.json'
import { Button, SimpleGrid } from '@chakra-ui/react'

//todo: button color

const FormSelection = (props) => {

  const handleOnClick = (pageIndex) => {
    props.newPage(pageIndex)
  };

  return (
    <SimpleGrid columns={4} spacing={5} >
      {
        formJSON.map((page, i) =>
          <Button
            size="md"
            fontSize={11}
            colorScheme={page.colorScheme}
            onClick={() => handleOnClick(i)}
          >
            {page.page_label}
          </Button>
        )
      }
    </SimpleGrid >
  )
}

export default FormSelection
