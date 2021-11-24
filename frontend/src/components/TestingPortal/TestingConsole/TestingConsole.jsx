import React from 'react'
import {
  Grid,
  Box,
  Button,
  Stack,
  Heading,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";

const TestingConsole = () => {
  return (
    <GridItem rowSpan={2} colSpan={2}>
    <Grid>
      <Box borderWidth={5}></Box>
    </Grid>
    </GridItem>
  )
}

export default TestingConsole
