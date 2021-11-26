import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import ContractsLoader from "./components/ContractsLoader";

const ContractSelection = () => {
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

      <Flex
        ml="5"
        // flexDirection="column"
        boxShadow="0 4px 12px rgba(0,0,0,0.15)"
        borderRadius={30}
        alignItems="center"
        h="90vh"
        mt="2.5vh"
        w="77.7vw" // change to flex around the loaded contracts
        
      >
        {/* <ContractsLoader /> */}
      </Flex>

    </Flex>
  );
};

export default ContractSelection;
