import React, { useState, useEffect } from 'react'
import Element from "./components/Element"
import formJSON from './formElement.json'
import {
  Button,
  FormLabel,
  FormControl,
  GridItem,
  Flex, Spacer,
  Divider,
  Link,
  Popover,
  PopoverTrigger
} from '@chakra-ui/react'
import { FormContext } from './components/FormContext';
import OutputConsole from '../OutputConsole/OutputConsole';
import PopoverHeading from './components/PopoverHeading';
import SmartContracts from '../SmartContracts/SmartContracts';

const InputForm = (props) => {

  const [elements, setElements] = useState(null);

  useEffect(() => {
    setElements(SmartContracts[props.contractIndex].abi[props.page])
  }, [props.page])

  const { inputs, name, outputs, stateMutability } = elements ?? {}


  const handleSubmit = (event) => {
    event.preventDefault();
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
        w={props.navSize === "small" ? "33vw" : "25vw"}
        // w="33vw"
        background="white"

      // alignItems="center"
      >
        <PopoverHeading title={name} />
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
                inputs ? inputs.map((input, i) =>
                  <FormControl
                    align="center"
                    // borderWidth={2}
                    // borderColor="green"
                    p={1}
                  >
                    <FormLabel fontWeight="bold">{input.name}:</FormLabel>


                    <Element
                      // key={input.name} 
                      key={i}
                      input={input}
                    />


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





        <OutputConsole navSize={props.navSize} />



      </Flex >
    </FormContext.Provider >
  )
}

export default InputForm
