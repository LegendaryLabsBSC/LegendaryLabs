import React, { useState } from "react";
import {
  Grid,
  Box,
  Stack,
  Heading,
  GridItem,
  Flex,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import ElementSelection from "./components/ElementSelection";
import NavItem from "../../Sidebar/components/NavItem";
import { FiHome } from "react-icons/fi";

const FormSelection = (props) => {
  return (
    <Flex
      flexDirection="column"
      boxShadow="0 4px 12px rgba(0,0,0,0.15)"
      borderRadius={30}
      ml={5}
      h="90vh"
      mt="2.5vh"
      w="50vw"
      alignItems="center"
    >

      <Flex alignItems="center" flexDirection="row" w="100%" >
        <Box>
          <NavItem icon={FiHome} title="Back" />
        </Box>
        <Spacer />
        <Box>
          <Heading as="h3" size="lg">
            LegendsLaboratory
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <NavItem icon={FiHome} title="Docs" />
        </Box>
      </Flex>

      <Divider />
      <Flex
        mt={16}
        // alignItems="center"
        // justify-content='center'
        // w="100%"
        // borderWidth={3}
      >
      <ElementSelection newPage={props.newPage} />
    </Flex>
    </Flex >
  );
};

export default FormSelection;
