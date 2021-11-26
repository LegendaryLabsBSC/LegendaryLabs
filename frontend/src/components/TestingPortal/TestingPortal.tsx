import React, { useState } from "react";
import InputForm from "./InputForm/InputForm";
import FormSelection from "./FormSelection/FormSelection";
import { Flex } from "@chakra-ui/react";
import OutputConsole from "./OutputConsole/OutputConsole";

const TestingPortal = (props: any) => {
  const [page, setPage] = useState(0);

  return (
    <Flex
      pos="sticky"
      left="5"
      mr="4%"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px rgba(0,0,0,0.15)"
      borderRadius={"30px"}
      w="80vw"
      flexDir="row"
      justifyContent="space-between"
      // alignItems="center"
    >
      {/* <Flex
        ml="5"
        // alignItems="center"
        h="95vh"
        mt="2.5vh"
        w="60vw"
        borderWidth={2} //vis
      > */}
        <FormSelection newPage={setPage} />
      {/* </Flex> */}

      <InputForm page={page} />
      {/* <OutputConsole /> */}
    </Flex>
  );
};

export default TestingPortal;
