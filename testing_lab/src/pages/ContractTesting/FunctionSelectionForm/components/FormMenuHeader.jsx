import React from 'react'
import { GiWhiteBook, GiScrollUnfurled } from 'react-icons/gi'
import { smartContracts } from '../../../../config/contractInterface';
import LinkButton from '../../../../components/LinkButton';
import DropdownMenu from '../../../../components/DropdownMenu';
import {
  Heading,
  Flex,
  Spacer
} from "@chakra-ui/react";


const FormMenuHeader = (props) => {

  const handleOnClick = (data, index) => {
    props.setContractData(data)
    props.setContractIndex(index)
  }

  return (
    <Flex
      mt={3}
      mb={2}
      w="100%"
      alignItems="center"
    >
      <DropdownMenu
        title="Contracts"
        color="blue.500"
        leftIcon={<GiScrollUnfurled />}
        menuSource={smartContracts}
        handleOnClick={handleOnClick}
      />
      <Spacer />
      <Flex>
        <Heading as="h3" size="lg">
          {props.contractData.contractName}
        </Heading>
      </Flex>
      <Spacer />
      <LinkButton
        title="Docs"
        color="blue.500"
        rightIcon={<GiWhiteBook />}
        slugSource={props.contractData.sourceName}
      />
    </Flex>
  )
}

export default FormMenuHeader
