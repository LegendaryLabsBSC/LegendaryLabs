import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Stack,
  Heading,
  GridItem,
  Flex,
  Spacer,
  Divider,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Link
} from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouteLink,
} from "react-router-dom";
import ElementSelection from "./components/ElementSelection";
import NavItem from "../../../components/Sidebar/components/NavItem";
import { FiFileText, FiHome } from "react-icons/fi";
import ContractTesting from "../ContractTesting";
import SmartContracts from "../SmartContracts/SmartContracts";
import FormHeader from "./components/FormHeader";


const FormSelection = (props) => {
  // const [functions, setFunction] = useState(null)

  // const { landing } = 
  // // SmartContracts[0]
  // SmartContracts.map((page, i) => {
  //   if (i === 0) {
  //     return page
  //   }
  // })


  const [contract, setContract] = useState({});

  // useEffect(() => {
  //   setContract(contract)
  // }, [contract])

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





      <FormHeader setContract={setContract} contract={contract} />
      <Divider />



      <Flex
        mt={5}
      // alignItems="center"
      // justify-content='center'
      // w="100%"
      // borderWidth={3}
      >
        <ElementSelection contract={contract} newPage={props.newPage}
        //todo: move to input form ? 
        />
      </Flex>
    </Flex >
  );
};

export default FormSelection;
