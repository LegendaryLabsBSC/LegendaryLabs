import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

//todo: button color

const ContractFunctions = (props) => {

  const handleOnClick = (pageIndex) => {
    props.newPage(pageIndex);
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
        wrap="wrap" m={1} j
        justify="center"
      >
        {props.contract &&
          props.contract.abi &&
          props.contract.abi.map((page, i) =>
            page.name && page.type === "function" ? (
              <Button
                size="md"
                fontSize={11}
                {...setColorScheme(page.stateMutability)}
                onClick={() => handleOnClick(i)}
                boxShadow="0 4px 12px rgba(0,0,0,0.55)"
                w="20%"
                m={2}
              >
                <Text
                  fontSize={12}
                >
                  {page.name}
                </Text>
              </Button>
            ) : null
          )}
      </Flex>
    </Flex>
  );
};

export default ContractFunctions;
