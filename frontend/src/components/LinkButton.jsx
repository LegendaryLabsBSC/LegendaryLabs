import React from 'react'
import { Flex, Button, Link } from '@chakra-ui/react'

const LinkButton = (props) => {

  const handleURL = () => {
    const baseURL = "https://docs.legendarylabs.net/docs/"
    const slug = props.slugSource.split('.')[0]

    return `${baseURL}${slug}`
  }

  return (
    <Flex
    >
      <Link
        isExternal
        href={handleURL()}
        style={{ textDecoration: 'none' }}
      >
        <Button
          size="lg"
          borderRadius={36}
          background="none"
          color={props.color}
          _hover={{ background: 'none' }}
          rightIcon={props.rightIcon ? props.rightIcon : null}
          leftIcon={props.leftIcon ? props.leftIcon : null}
        >
          {props.title}
        </Button>
      </Link>
    </Flex>
  )
}

export default LinkButton
