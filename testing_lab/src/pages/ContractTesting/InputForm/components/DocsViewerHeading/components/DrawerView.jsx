import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'


const DrawerView = (props) => {

  const handleURL = () => {
    const baseURL = "https://docs.legendarylabs.net/docs/"
    const slug = props.slugSource.split('.')[0]
    const subSlug = `${props.title}`.toLowerCase()

    return `${baseURL}${slug}#${subSlug}`
  }


  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        placement='right'
        size="md"
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerCloseButton
              {...props.longPressEvent}
            />
          </DrawerHeader>
          <DrawerBody>
            <iframe
              src={`${props.handleURL()}`}
              width="100%"
              height="100%"
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DrawerView