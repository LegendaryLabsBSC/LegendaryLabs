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
  Link
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


const FormHeader = () => {
  return (
    <Flex
      alignItems="center"
      // flexDirection="row"
      w="100%"
      mt={3}
      mb={2}
    >
      <Menu >
        <Routes>
          <Route path="/contract-testing/" element={<ContractTesting />} />
        </Routes>

        <Box>
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
            {
              SmartContracts.map((contract, i) =>
                <RouteLink to={contract.contractName}>
                  <MenuItem>{contract.contractName}</MenuItem>
                </RouteLink>
              )
            }
          </MenuList>
        </Box>
      </Menu>
      <Spacer />
      <Box>
        <Heading as="h3" size="lg">
          LegendsLaboratory
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
