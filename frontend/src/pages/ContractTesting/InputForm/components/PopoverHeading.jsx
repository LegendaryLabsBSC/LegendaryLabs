import React from 'react'
import { Flex, Popover, PopoverTrigger, Heading, Button, PopoverContent, PopoverBody } from '@chakra-ui/react'

const PopoverHeading = ({ title }) => {

  const popoverSlug = `${title}`.toLowerCase()

  return (
    <Flex
      flexDirection="row"
      // borderWidth={3}
      justify="center"
      w="100%"
      mt={4}
    // mb={3}
    >
      <Popover placement='left-start'>
        <PopoverTrigger>
          <Button
            background="none"
            _hover={{ background: 'blue.500' }}
          >
            <Heading as="h4" size="md">{title}</Heading>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <iframe
              src={`https://docs.legendarylabs.net/docs/contracts/lab/LegendsLaboratory#${popoverSlug}`}
              // todo: fix this to handle dynamic slugs; for contracts other than lab^
              width="500px"
              height="500px">
            </iframe>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>

  )
}

export default PopoverHeading
