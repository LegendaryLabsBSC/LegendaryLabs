import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import setColorScheme from "../../../../utils/setColorScheme";

const ContractFunctions = (props) => {

  const handleOnClick = (functionIndex) => {
    props.setContractFunction(functionIndex);
  };

  return (
    <Flex
      mt={5}
      style={{ overflow: "hidden" }}
      width="100%"
      height="100%"
      overflow="hidden"
      position="relative"
    >
      <Flex
        top="0"
        h="77vh"
        right="-20px"
        flexDir="column"
        overflowY="scroll"
        overflowX="hidden"
        position="absolute"
      >
        <Flex
          m={1}
          wrap="wrap"
          justify="center"
        >
          {props.contractData &&
            props.contractData.abi &&
            props.contractData.abi.map((contractCall, i) =>
              contractCall.type === "function" ? (
                <Button
                  m={2}
                  w={40}
                  size="md"
                  boxShadow="0 4px 12px rgba(0,0,0,0.55)"
                  colorScheme={setColorScheme(contractCall.stateMutability)}
                  onClick={() => handleOnClick(i)}
                >
                  <Text fontSize={12}>
                    {contractCall.name}
                  </Text>
                </Button>
              ) : null
            )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ContractFunctions;
