import React, { useState } from "react";
import InputForm from "./InputForm/InputForm";
import FunctionSelectionForm from "./ContractFunctions/FunctionSelectionForm";
import { Flex } from "@chakra-ui/react";
// import OutputConsole from "./OutputConsole/OutputConsole";

const ContractTesting = (props: any) => {
  const [contractFunction, setContractFunction] = useState(0);
  
  const [contractIndex, setContractIndex] = useState(0);

  return (
    <>
      <FunctionSelectionForm
        setContractFunction={setContractFunction}
        setContractIndex={setContractIndex}
        contractIndex={contractIndex}
      />
      <InputForm
        navSize={props.navSize}
        contractFunction={contractFunction}
        contractIndex={contractIndex}
      />
    </>
  );
};

export default ContractTesting;
