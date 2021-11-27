import React, { useState } from "react";
import InputForm from "./InputForm/InputForm";
import FormSelection from "./FormSelection/FormSelection";
import { Flex } from "@chakra-ui/react";
// import OutputConsole from "./OutputConsole/OutputConsole";

const ContractTesting = (props: any) => {
  const [page, setPage] = useState(0);

  return (
    <>
      <FormSelection newPage={setPage} />
      <InputForm navSize={props.navSize} page={page} />
    </>
  );
};

export default ContractTesting;
