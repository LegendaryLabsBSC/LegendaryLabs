import React, { useState } from 'react'
import useLongPress from '../../../../../utils/useLongPress';
import PopoverView from './components/PopoverView';
import DrawerView from './components/DrawerView';
import {
  Flex,
  Popover,
  PopoverTrigger,
  Heading,
  Button,
  PopoverContent,
  PopoverBody,
  useDisclosure
} from '@chakra-ui/react'

const DocsViewerHeading = (props) => {
  const [isOpen, toggleOpen] = useState(false)
  const [isDrawerView, toggleDrawerView] = useState(false)

  const handleURL = () => {

    console.log('good3')

    const baseURL = "https://docs.legendarylabs.net/docs/"
    const slug = props.contractData.sourceName.split('.')[0]
    const subSlug = `${props.title}`.toLowerCase()

    return `${baseURL}${slug}#${subSlug}`
  }

  const onLongPress = () => {
    console.log('longpress is triggered');

    console.log(isDrawerView === false)

    isDrawerView ?
      toggleDrawerView(false)
      : toggleDrawerView(true)
  };

  const onClick = () => {
    console.log('click is triggered')
    isOpen ?
      toggleOpen(false)
      : toggleOpen(true)
  }

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 150,
  };
  // const longPressEvent = useLongPress(onLongPress, null, defaultOptions);
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  return (
    <Flex
      mt={4}
      w="100%"
      justify="center"
      borderWidth={3}
      borderColor="red"
    >
      <Button
        background="none"
        borderWidth={isDrawerView ? 2 : null}
        borderColor={isDrawerView ? `${props.colorScheme}.100` : null}
        _hover={{ background: `${props.colorScheme}.100` }}
        {...longPressEvent}
      >
        <Heading as="h4" size="md">
          {props.title}
        </Heading>
      </Button>
      {/* {isDrawerView ?
        <DrawerView
          longPressEvent={longPressEvent}
          handleURL={() => handleURL()}
          slugSource={props.contractData.sourceName}
          title={props.title}
          colorScheme={props.colorScheme}
          isOpen={isOpen}
          // toggleClose={toggleOpen}
          // onClick={onClick}
        /> */}
        {/* :  */}
        <PopoverView
          longPressEvent={longPressEvent}
          handleURL={() => handleURL()}
          slugSource={props.contractData.sourceName}
          title={props.title}
          colorScheme={props.colorScheme}
          isOpen={isOpen}
        />
      {/* } */}
    </Flex >
  )
}

export default DocsViewerHeading
