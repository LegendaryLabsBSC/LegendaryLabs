import React, { useState } from "react";
import { Flex, Divider } from "@chakra-ui/react";
import FormMenuHeader from "./components/FormMenuHeader";
import ContractFunctions from "./components/ContractFunctions";
import { smartContracts } from "../../../config/contractInterface";

const FunctionSelectionForm = (props: any) => {
  const defaultContract = smartContracts[props.contractIndex];
  const [contractData, setContractData] = useState(defaultContract);

  return (
    <Flex
      ml={5}
      mt={5}
      w="50vw"
      h="90vh"
      borderRadius={30}
      background="white"
      alignItems="center"
      flexDirection="column"
      boxShadow="0 4px 12px rgba(0,0,0,0.75)"
    >
      <FormMenuHeader
        contractData={contractData}
        contractIndex={props.contractIndex}
        setContractData={setContractData}
        setContractIndex={props.setContractIndex}
      />
      <Divider />
      <ContractFunctions
        contractData={contractData}
        contractIndex={props.contractIndex}
        setContractFunction={props.setContractFunction}
      />
    </Flex>
  );
};

export default FunctionSelectionForm;
