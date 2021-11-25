import React, { useState, useEffect } from "react";
import InputForm from "./InputForm/InputForm";
import FormSelection from "./FormSelection/FormSelection";
import {
  Grid,
  Box,
  Button,
  HStack,
  Heading,
  SimpleGrid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import LabContractCalls from "./LabContractCalls";
import TestingConsole from "./TestingConsole/TestingConsole";

const TestingPortal = () => {
  const [page, setPage] = useState(0);

  return (
    // <Grid padding="60px 5px 0 5px" templateRows="repeat(4, 1fr)" templateColumns="repeat(4, 1fr)" gap={4}>
    // <HStack spacing={24} align="center" margin="5% 5%" newPage={setPage}>

    <Flex
      pos="sticky"
      left="16.5%"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px rgba(0,0,0,0.15)"
      borderRadius={30}
      w={"80%"}
      flexDir="row"
      justifyContent="space-between"
    >
      {/* <Flex
        pos="sticky"
        left="5"
        h="95vh"
        marginTop="2.5vh"
        boxShadow="0 4px 12px rgba(0,0,0,0.05)"
        borderRadius={30}
        w={"80%"}
        flexDir="column"
        justifyContent="space-between"
      >
        <LabContractCalls newPage={page} />
      </Flex>
      <InputForm page={page} /> */}
    </Flex >
  )
}

export default TestingPortal
