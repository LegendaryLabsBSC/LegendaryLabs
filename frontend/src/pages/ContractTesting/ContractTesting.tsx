import React, { useState } from "react";
import FunctionSelectionForm from "./ContractFunctions/FunctionSelectionForm";
import InputForm from "./InputForm/InputForm";

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
