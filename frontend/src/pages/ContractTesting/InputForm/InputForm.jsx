import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import FormElement from "./components/FormElement"
import OutputConsole from './OutputConsole/OutputConsole';
import PopoverDocsHeading from './components/PopoverDocsHeading';
import { smartContracts } from '../../../config/contractInterface';
import smartContractCall from '../../../utils/smartContractCall'
import {
  Button,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Flex,
} from '@chakra-ui/react'

const InputForm = (props) => {
  const [elements, setElements] = useState(null);
  const [outputContent, addOutputContent] = useState([""])

  //todo:
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm()

  const onSubmit = async (values) => {
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

    const data = await smartContractCall(props.contractIndex, callType, name, values)
    handleOutput(JSON.stringify(data))
  }


  const handleOutput = (data) => {
    const newLine = `\n${name}: ${data}\n`

    addOutputContent(outputContent => [...outputContent, newLine])
  }

  useEffect(() => {
    reset()
    setElements(
      smartContracts[props.contractIndex].abi[props.contractFunction]
    )
  }, [props.contractFunction])

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
      <PopoverDocsHeading
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
          <Flex
            flexDirection="column"
          >
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
                  <FormElement
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
            {elements != null ? (
              <Button
                type="submit"
                size="lg"
                isLoading={isSubmitting}
                // onClick={() => console.log(elements)}
                onClick={() => console.log(Object.values(elements))}
                loadingText='Submitting'
              >
                Submit
              </Button>) : null
            }
          </Flex>
        </form>
      </Flex>
      <OutputConsole
        navSize={props.navSize}
        name={name}
        outputContent={outputContent}
        clearOutputContent={addOutputContent}
      />
    </Flex >
  )
}

export default InputForm
