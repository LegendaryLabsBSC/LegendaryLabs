import React, { useState, useEffect } from 'react'
import Element from "./components/Element"
import formJSON from './formElement.json'
import {
  Button,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Flex,
} from '@chakra-ui/react'
import { FormContext } from './components/FormContext';
import OutputConsole from '../OutputConsole/OutputConsole';
import PopoverHeading from './components/PopoverHeading';
import SmartContracts from '../SmartContracts/SmartContracts';
import { useForm } from 'react-hook-form'
import smartContractCall from './smartContractCall';

const InputForm = (props) => {

  //todo : ?
  const [elements, setElements] = useState(null);

  //todo:
  const {
    handleSubmit, register,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = (values) => {
    let callType;

    switch (stateMutability) {
      case 'nonpayable':
        callType = 'write'
        break;

      case 'view':
        callType = 'read'
        break;

      default:
        console.log(`Error: ${stateMutability} Call Not Supported`)
    }

    smartContractCall(props.contractIndex, callType, name, values)
  }

  useEffect(() => {
    setElements(
      SmartContracts[props.contractIndex].abi[props.page]
    )
  }, [props.page])

  //todo : ?
  const { inputs, name, outputs, stateMutability, value } = elements ?? {}

  const handleSlug = (label) => {
    return label.toLowerCase()
  }

  //todo: make form header text color match button color
  return (
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
      <PopoverHeading
        title={name}
        colorScheme={stateMutability}
      />
      <Flex
        // borderWidth={2}
        flexDirection="column"
        // justifyContent="center"
        // borderColor="blue"
        h="60%"
        p={5}
      >


        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column">


            {
              inputs ? inputs.map((input, i) =>
                <FormControl
                  align="center"
                  // borderWidth={2}
                  // borderColor="green"
                  p={1}
                  isInvalid={errors.name}
                >
                  <FormLabel
                    fontWeight="bold"
                    htmlFor='name'
                  >
                    {input.name}:
                  </FormLabel>


                  <Element
                    key={input.name}
                    input={input}
                    register={register}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>

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
              // onClick={(e) => handleSubmit(e)}
              // onClick={() => handleSubmit()}
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Flex>

      <OutputConsole navSize={props.navSize} />
    </Flex >
  )
}

export default InputForm
