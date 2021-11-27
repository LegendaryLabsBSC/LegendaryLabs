import React, { useState } from "react";
import InputForm from "./InputForm/InputForm";
import FormSelection from "./FormSelection/FormSelection";
import { Flex } from "@chakra-ui/react";
// import OutputConsole from "./OutputConsole/OutputConsole";
import ContentContainer from "../../components/Sidebar/ContentContainer";

const ContractTesting = (props: any) => {
  const [page, setPage] = useState(0);

  return (
    <Flex
      pos="sticky"
      left="5"
      mr="4%"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px rgba(0,0,0,1)"
      borderRadius={"30px"}
      w="80vw"
      flexDir="row"
      justifyContent="space-between"
      background="blue.500"
      // alignItems="center"
    >
      {/* <ContentContainer> */}
      <FormSelection newPage={setPage} />
      <InputForm page={page} />
      {/* </ContentContainer> */}
    </Flex>
  );
};

export default ContractTesting;
