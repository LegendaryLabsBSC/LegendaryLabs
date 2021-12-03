import React from 'react'
import {
  Container,
  Flex,
  Text,
  Heading
} from "@chakra-ui/react";
import { FiSlash, FiDownload } from 'react-icons/fi'
import TooltipButton from '../../../../components/TooltipButton';
import downloadFile from '../../../../utils/downloadFile';


const OutputConsole = (props) => {

  const ConsoleHeader = () => (
    <Heading
      as='h5'
      size='sm'
      mt={2}
    >
      Smart Contract Response Log:
    </Heading>
  )

  const LogContent = () => (
    props.outputContent.length > 1 ?
      props.outputContent.map((line, key) =>
      (
        <Text
          key={key}
          fontSize="sm"
          ml={2}
          p={2}
        >
          {line}
        </Text>
      ))
      : null
  )

  const clearLog = () => {
    props.clearOutputContent([""])
  }
  return (
    <Flex
      w={props.navSize === "small" ? "32vw" : "24vw"}
      ml=".5vw"
      h="27vh"
      mt="1vh"
      boxShadow="0 4px 12px rgba(49,130,206,0.55) inset"
      borderRadius={15}
      overflowY={props.outputContent.length > 1 ? "scroll" : "hidden"}
      overflowX={"hidden"}
    >
      <Container >
        <ConsoleHeader />
        <Flex
          position="absolute"
          right={28}
          bottom={8}
        >
          <TooltipButton
            icon={<FiSlash />}
            tooltipLabel="Clear Log"
            tooltipPlacement="top-start"
            onClick={clearLog}
          />
          <TooltipButton
            icon={<FiDownload />}
            tooltipLabel="Download Log"
            tooltipPlacement="top-end"
            onClick={() => downloadFile(
              props.outputContent,
              "\n>--",
              "contract-testing-log",
              "text/plain",
              "txt")}
          />
        </Flex>
        <LogContent />
      </Container >
    </Flex >
  )
}

export default OutputConsole
