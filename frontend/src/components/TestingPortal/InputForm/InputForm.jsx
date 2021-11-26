import React, { useState, useEffect } from 'react'
import Element from "./Element"
import formJSON from './formElement.json'
import { Grid, Box, Button, Stack, Heading, HStack, FormLabel, FormControl, GridItem, Flex, Spacer, Divider } from '@chakra-ui/react'
import { FormContext } from './FormContext';
import OutputConsole from '../OutputConsole/OutputConsole';

const InputForm = (props) => {

  const [elements, setElements] = useState(null);

  useEffect(() => {
    setElements(formJSON[props.page])
  }, [props.page])

  const { fields, page_label } = elements ?? {}

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(elements)
  }

  const handleChange = (id, event) => {
    const newElements = { ...elements }

    newElements.fields.forEach(field => {
      const { field_type, field_id } = field;

      if (id === field_id) {
        switch (field_type) {

          case "slider":
            field['field_value'] = event;
            break;

          case "radio":
            field['field_value'] = event;
            break;

          default:
            field['field_value'] = event.target.value;
            break;
        }
      }
      setElements(newElements)
    });
    console.log(elements)
  }

  //todo: change key from using index
  //todo: make form header text color match button color
  return (
    // <GridItem rowSpan={2} colSpan={2}>

    <FormContext.Provider value={{ handleChange }}>
      <Flex
        boxShadow="0 4px 12px rgba(0,0,0,0.15)"
        borderRadius={30}
        flexDirection="column"
        mr={5}
        h="90vh"
        mt="2.5vh"
        w="25vw"
      // alignItems="center"
      >


        <Flex
          flexDirection="row"
          // borderWidth={3}
          justify="center"
          w="100%"
          mt={4}
          mb={3}
        >
          <Heading as="h4" size="md">{page_label}</Heading>
        </Flex>

        <Flex
          borderWidth={2}
          flexDirection="column"
          // justifyContent="center"
          borderColor="blue"
          h="60%"
          p={5}
        >
          <form>
            {
              fields ? fields.map((field, i) =>
                <FormControl
                  align="center"
                  // borderWidth={2}
                  // borderColor="green"
                  p={1}
                >
                  <FormLabel fontWeight="bold">{field.field_label}:</FormLabel>
                  <Element key={i} field={field} />
                </FormControl>
              ) : null
            }
            <Flex
              // borderWidth={3}
              flexDirection="column"
              alignItems="center"
              p={3}
              mt={5}
            >
              <Button
                type="submit"
                // m={3}
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </Button>
            </Flex>
          </form>
        </Flex>
        <OutputConsole />
      </Flex>
    </FormContext.Provider >
  )
}

export default InputForm
