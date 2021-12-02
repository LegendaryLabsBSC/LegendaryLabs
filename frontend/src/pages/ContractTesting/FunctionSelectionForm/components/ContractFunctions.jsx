import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

//todo: button color

const ContractFunctions = (props) => {

  const handleOnClick = (functionIndex) => {
    props.setContractFunction(functionIndex);
  };

  //todo: extract this out ? reuse with popoverheading
  const setColorScheme = (theme) => { ////!!! theme ? change ?
    switch (theme) {
      case "nonpayable":
        return {
          colorScheme: "red",
        };

      case "view":
        return {
          colorScheme: "blue",
        };

      case "payable":
        return {
          colorScheme: "green",
        };

      default:
        return {
          colorScheme: "gray",
        };
    }
  };

  return (
    <Flex
      position="absolute"
      top="0"
      right="-20px"
      overflowY="scroll"
      overflowX="hidden"
      h="77vh"
      flexDir="column"
    >
      <Flex
        m={1}
        wrap="wrap"
        justify="center"
      >
        {props.contractData &&
          props.contractData.abi &&
          props.contractData.abi.map((contractCall, i) =>
            contractCall.name && contractCall.type === "function" ? (
              <Button
                size="md"
                fontSize={11}
                {...setColorScheme(contractCall.stateMutability)}
                onClick={() => handleOnClick(i)}
                boxShadow="0 4px 12px rgba(0,0,0,0.55)"
                w="20%"
                m={2}
              >
                <Text
                  fontSize={12}
                >
                  {contractCall.name}
                </Text>
              </Button>
            )
              : null
          )
        }
      </Flex>
    </Flex>
  );
};

export default ContractFunctions;
