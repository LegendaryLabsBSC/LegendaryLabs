import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import FormElement from "./components/FormElement"
import OutputConsole from './OutputConsole/OutputConsole';
import PopoverDocsHeading from './components/PopoverDocsHeading';
import { smartContracts } from '../../../config/contractInterface';
import smartContractCall from '../../../utils/smartContractCall'
import setColorScheme from '../../../utils/setColorScheme';
import {
  Button,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Flex,
} from '@chakra-ui/react'
import DrawerDocs from './components/DrawerDocs';

const InputForm = (props) => {
  const [elements, setElements] = useState(null);
  const [outputContent, addOutputContent] = useState([""])

  const { inputs, name, outputs, stateMutability, value } = elements ?? {}

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  function handleDefaultView() {

    const filterBy = (f) => {
      if (f.type !== "function") return false

      return true
    }

    const defaultView = smartContracts[props.contractIndex] &&
      smartContracts[props.contractIndex].abi &&
      smartContracts[props.contractIndex].abi.filter(filterBy);

    return defaultView[0]
  }

  useEffect(() => {
    reset()
    setElements(handleDefaultView)
  }, [props.contractIndex])

  useEffect(() => {
    reset()
    setElements(
      smartContracts[props.contractIndex].abi[props.contractFunction]
    )
  }, [props.contractFunction])

  const onSubmit = async (values) => {
    let callType;

    //todo: eval other call types to see if this can be simplified 
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

    const transaction = await smartContractCall(props.contractIndex, callType, name, values)
    handleOutput(transaction, callType, values)
  }

  const handleOutput = (transaction, callType, values) => {
    if (transaction.code === 4001) return // no output if user rejects transaction

    let data;

    if (callType === "write") {
      transaction.hash ?
        data = `${transaction.hash} ${JSON.stringify(values)}`
        : data = (JSON.stringify(transaction))
    } else {
      data = transaction
    }

    const newLine = `${name}:\n ${data}\n`

    addOutputContent(outputContent => [...outputContent, newLine])
  }

  //todo: ;; move to PDH ?
  const handleURL = (label) => {
    return label.toLowerCase()
  }

  return (
    <Flex
      boxShadow="0 4px 12px rgba(0,0,0,0.75)"
      borderRadius={30}
      flexDirection="column"
      mr={5}
      h="90vh"
      mt="2.5vh"
      w={props.navSize === "small" ? "33vw" : "25vw"}
      background="white"
    >
      <PopoverDocsHeading
        title={name}
        contractData={smartContracts[props.contractIndex]}
        colorScheme={setColorScheme(stateMutability)}
      />

      {/* <DrawerDocs /> */}
      <Flex
        flexDirection="column"
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
                colorScheme={setColorScheme(stateMutability)}
                isLoading={isSubmitting}
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
