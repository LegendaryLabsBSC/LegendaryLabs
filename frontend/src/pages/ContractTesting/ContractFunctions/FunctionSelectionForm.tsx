import React, { useState } from "react";
import { Flex, Divider } from "@chakra-ui/react";
import FormMenuHeader from "./components/FormMenuHeader";
import ContractFunctions from "./components/ContractFunctions";

const FunctionSelectionForm = (props: any) => {
  const [contract, setContract] = useState({});

  return (
    <Flex
      flexDirection="column"
      boxShadow="0 4px 12px rgba(0,0,0,0.75)"
      borderRadius={30}
      ml={5}
      h="90vh"
      mt="2.5vh"
      w="50vw"
      alignItems="center"
      background="white"
    >
      <FormMenuHeader
        setContract={setContract}
        contract={contract}
        setContractIndex={props.setContractIndex}
        contractIndex={props.contractIndex}
      />
      <Divider />
      <Flex
        mt={5}
        style={{ overflow: "hidden" }}
        width="100%"
        height="100%"
        overflow="hidden"
        position="relative"
      >
        <ContractFunctions
          contract={contract}
          contractIndex={props.contractIndex}
          newPage={props.newPage}
        />
      </Flex>
    </Flex>
  );
};

export default FunctionSelectionForm;
