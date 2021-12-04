import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import FormElement from "./components/FormElement"
import OutputConsole from './components/OutputConsole';
import PopoverDocsHeading from './components/PopoverDocsHeading';
import { smartContracts } from '../../../config/contractInterface';
import smartContractCall from '../../../utils/smartContractCall'
import setColorScheme from '../../../utils/setColorScheme';
import DrawerDocs from './components/DrawerDocs';
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

  const { inputs, name, outputs, stateMutability } = elements ?? {}

  const {
    handleSubmit,
    register,
    reset,
    formState: {
      errors,
      isSubmitting
    },
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

    console.log(values)

    if (stateMutability === "view") {
      callType = 'read'
    }
    else {
      callType = 'write'
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

    const newLine = `\n${name}:\n ${data}\n\n`
    // const newLine = `${name}: ${data}`

    addOutputContent(outputContent => [...outputContent, newLine])
  }

  return (
    <Flex
      mr={5}
      h="90vh"
      mt="2.5vh"
      borderRadius={30}
      background="white"
      flexDirection="column"
      boxShadow="0 4px 12px rgba(0,0,0,0.75)"
      w={props.navSize === "small" ? "33vw" : "25vw"}
    >
      <PopoverDocsHeading
        title={name}
        colorScheme={setColorScheme(stateMutability)}
        contractData={smartContracts[props.contractIndex]}
      />
      {/* <DrawerDocs /> */}
      <Flex //todo: extract out
        p={5}
        h="60%"
        flexDirection="column"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column">
            {
              inputs ? inputs.map((input, i) =>
                <FormControl
                  p={1}
                  align="center"
                  isInvalid={errors.name}
                >
                  <FormLabel
                    htmlFor='name'
                    fontWeight="bold"
                  >
                    {input.name}:
                  </FormLabel>
                  <FormElement
                    input={input}
                    key={input.name}
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
            p={2}
            mt={3}
            alignItems="center"
            flexDirection="column"
          >
            {elements != null ? (
              <Button
                size="lg"
                type="submit"
                loadingText='Submitting'
                isLoading={isSubmitting}
                colorScheme={setColorScheme(stateMutability)}
              >
                Submit
              </Button>) : null
            }
          </Flex>
        </form>
      </Flex>
      <OutputConsole
        name={name}
        navSize={props.navSize}
        outputContent={outputContent}
        clearOutputContent={addOutputContent}
        consoleHeader="Smart Contract Response Log:"
      />
    </Flex >
  )
}

export default InputForm
