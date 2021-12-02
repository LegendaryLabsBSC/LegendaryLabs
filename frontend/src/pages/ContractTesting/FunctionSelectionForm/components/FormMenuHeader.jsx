import React from 'react'
import { GiWhiteBook, GiScrollUnfurled } from 'react-icons/gi'
import { smartContracts } from '../../../../config/contractInterface';
import {
  Box,
  Heading,
  Flex,
  Spacer,
  Menu,
  MenuButton,
  Button,
  MenuList,
  Link,
  MenuOptionGroup,
  MenuItemOption
} from "@chakra-ui/react";


const FormMenuHeader = (props) => {

  const handleOnClick = (contractData, index) => {
    props.setContract(contractData)
    console.log(contractData)
    props.setContractIndex(index)
  }


  // use effect here on render ??

  return (
    <Flex
      alignItems="center"
      w="100%"
      mt={3}
      mb={2}
    >
      <Menu >
        <MenuButton
          as={Button}
          leftIcon={<GiScrollUnfurled />}
          background="none"
          color="blue.500"
          size="lg"
          _hover={{ background: 'none' }}
        >
          Contracts
        </MenuButton>
        <MenuList>
          <MenuOptionGroup
            title="Contracts"
            type='radio'
          //todo: add second group to use as a filter; read,write, etc
          >
            {
              smartContracts.map((contract, i) =>
                <MenuItemOption
                  value={`${i}`}
                  onClick={() => handleOnClick(contract, i)}
                >
                  {contract.contractName}
                </MenuItemOption>
              )
            }
          </MenuOptionGroup>
        </MenuList>
      </Menu>



      <Spacer />
      <Box>
        <Heading as="h3" size="lg">
          {props.contract.contractName}
        </Heading>
      </Box>
      <Spacer />

      <Flex>
        <Link
          href="https://docs.legendarylabs.net/docs/contracts"
          style={{ textDecoration: 'none' }}
          isExternal
        >
          <Button
            rightIcon={<GiWhiteBook />}
            background="none"
            color="blue.500"
            size="lg"
            _hover={{ background: 'none' }}

          >
            Docs
          </Button>
        </Link>
      </Flex>
    </Flex >
  )
}

export default FormMenuHeader
