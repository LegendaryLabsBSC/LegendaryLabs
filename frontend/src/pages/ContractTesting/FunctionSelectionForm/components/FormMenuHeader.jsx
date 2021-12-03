import React from 'react'
import { GiWhiteBook, GiScrollUnfurled } from 'react-icons/gi'
import { smartContracts } from '../../../../config/contractInterface';
import {
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

  const handleOnClick = (data, index) => {
    props.setContractData(data)
    props.setContractIndex(index)
  }

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
          >
            {
              smartContracts.map((contractData, contractIndex) =>
                <MenuItemOption
                  value={`${contractIndex}`}
                  onClick={() => handleOnClick(contractData, contractIndex)}
                >
                  {contractData.contractName}
                </MenuItemOption>
              )
            }
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      <Spacer />
      <Flex>
        <Heading as="h3" size="lg">
          {props.contractData.contractName}
        </Heading>
      </Flex>

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
