import React, { useState } from 'react'
import {
  Flex,
  Popover,
  PopoverCloseButton,
  Heading,
  Button,
  PopoverContent,
  PopoverBody,
  PopoverHeader
} from '@chakra-ui/react'
import ViewDocsDrawer from './DrawerView'
import useLongPress from '../../../../../../utils/useLongPress';

const PopoverView = (props) => {
  const [isDrawerView, toggleDrawerView] = useState(false)

  const handleURL = () => {
    const baseURL = "https://docs.legendarylabs.net/docs/"
    // const slug = props.contractData.sourceName.split('.')[0]
    const slug = props.slugSource.split('.')[0]
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
    // toggleDrawerView(false)
  }

  const defaultOptions = {
    shouldPreventDefault: true,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  return (
    <>
      <Popover
        isOpen={props.isOpen}
        placement='center'

        borderWidth={3}
        borderColor="green"
      >
        <PopoverContent
          w="30vw"
          h="60vh"
          borderWidth={3}
          borderColor="blue"
        >
          <PopoverCloseButton
            mb={1}
            {...props.longPressEvent}
          />
          <PopoverBody>
            <iframe
              // src={`${handleURL()}`}
              src={`${props.handleURL()}`}
              width="100%"
              height="500px"
            />
            {/* </iframe> */}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default PopoverView
