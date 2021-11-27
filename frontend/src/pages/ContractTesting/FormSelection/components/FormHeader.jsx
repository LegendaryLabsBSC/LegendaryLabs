import React from 'react'
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
  Link,
  MenuOptionGroup,
  MenuItemOption
} from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouteLink,
} from "react-router-dom";
import { FiFileText, FiHome } from "react-icons/fi";
import ContractTesting from '../../ContractTesting';
import SmartContracts from '../../SmartContracts/SmartContracts';


const FormHeader = (props) => {

  const handleOnClick = (contractIndex) => {
    console.log(contractIndex)
    props.setContract(contractIndex)
    console.log(props.contract)
  }

  return (
    <Flex
      alignItems="center"
      // flexDirection="row"
      w="100%"
      mt={3}
      mb={2}
    >


      <Menu >
        {/* <Routes>
          <Route path="/contract-testing/" element={<ContractTesting />} />
        </Routes> */}
        {/* <Box> */}
        <MenuButton
          as={Button}
          leftIcon={<FiFileText />}
          background="none"
          color="blue.500"
          _hover={{ background: 'none' }}
        // _pressed={{ background: 'none' }}
        >
          Contracts
        </MenuButton>
        <MenuList>
          <MenuOptionGroup
            title="Contracts"
            defaultValue={`${props.contract}`} // todo: make contract persist on refresh
            type='radio'
          >
            {
              SmartContracts.map((contract, i) =>
                <MenuItemOption
                  value={`${i}`}
                  onClick={() => handleOnClick(contract)}
                >
                  {contract.contractName}
                </MenuItemOption>
              )
            }
          </MenuOptionGroup>
        </MenuList>
        {/* </Box> */}
      </Menu>



      <Spacer />
      <Box>
        <Heading as="h3" size="lg">
          {props.contract.contractName}
        </Heading>
      </Box>
      <Spacer />

      <Box>
        <Link href="https://docs.legendarylabs.net" style={{ textDecoration: 'none' }} isExternal>
          <Button
            rightIcon={<FiFileText />}
            background="none"
            color="blue.500"
            _hover={{ background: 'none' }}

          >
            Docs
          </Button>
        </Link>
      </Box>
    </Flex >
  )
}

export default FormHeader
