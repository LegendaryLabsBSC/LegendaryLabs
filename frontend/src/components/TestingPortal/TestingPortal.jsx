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
} from "@chakra-ui/react";
import LabContractCalls from "./LabContractCalls";
import TestingConsole from "./TestingConsole/TestingConsole";

const TestingPortal = () => {
  const [page, setPage] = useState(0);

  return (
    // <Grid padding="60px 5px 0 5px" templateRows="repeat(4, 1fr)" templateColumns="repeat(4, 1fr)" gap={4}>
    <HStack spacing={24} align="center" margin="5% 5%" newPage={setPage}>
      <LabContractCalls newPage={page}/>
      <InputForm page={page} />
      {/* <TestingConsole /> */}
    </HStack>
  )
}

export default TestingPortal
