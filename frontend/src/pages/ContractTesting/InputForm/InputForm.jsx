import React, { useState, useEffect } from 'react'
import Element from "./Element"
import formJSON from './formElement.json'
import {
  PopoverArrow,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Grid,
  Box,
  Button,
  Stack,
  Heading,
  HStack,
  FormLabel,
  FormControl,
  GridItem,
  Flex, Spacer,
  Divider,
  Link,
  Popover,
  PopoverTrigger
} from '@chakra-ui/react'
import { FormContext } from './FormContext';
import OutputConsole from '../OutputConsole/OutputConsole';

const InputForm = (props) => {

  const [elements, setElements] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

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

  const handleSlug = (label) => {
    return label.toLowerCase()
  }

  //todo: change key from using index
  //todo: make form header text color match button color
  return (
    // <GridItem rowSpan={2} colSpan={2}>

    <FormContext.Provider value={{ handleChange }}>
      <Flex
        boxShadow="0 4px 12px rgba(0,0,0,0.75)"
        borderRadius={30}
        flexDirection="column"
        mr={5}
        h="90vh"
        mt="2.5vh"
        w="25vw"
        background="white"

      // alignItems="center"
      >


        <Flex
          flexDirection="row"
          // borderWidth={3}
          justify="center"
          w="100%"
          mt={4}
        // mb={3}
        >
          <Popover>
            <PopoverTrigger>
              <Button
                background="none"
                _hover={{ background: 'blue.500' }}
              >
                <Heading as="h4" size="md">{page_label}</Heading>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverCloseButton />
              <PopoverBody>
                <iframe
                  src={`https://docs.legendarylabs.net/docs/contracts/lab/LegendsLaboratory#${page_label}`}
                  // todo: fix this to handle dynamic slugs^
                  width="500px"
                  height="500px">
                </iframe>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>

        <Flex
          // borderWidth={2}
          flexDirection="column"
          // justifyContent="center"
          // borderColor="blue"
          h="60%"
          p={5}
        >
          <form>
            <Flex flexDirection="column">
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
            </Flex>

            <Flex
              flexDirection="column"
              alignItems="center"
              p={2}
              mt={3}
            >
              {/* <Spacer /> */}
              <Button
                type="submit"
                // w="30%"
                size="lg"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </Button>
            </Flex>
          </form>
        </Flex>





        <OutputConsole />



      </Flex >
    </FormContext.Provider >
  )
}

export default InputForm
