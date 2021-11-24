import React, { useState } from 'react'
import {
  Grid,
  Box,
  Stack,
  Heading,
  GridItem,
} from "@chakra-ui/react";

import FormSelection from "./FormSelection/FormSelection"


const LabContractCalls = (props) => {

  const [page, setPage] = useState(0);

  return (
    <GridItem rowSpan={4} colSpan={2}>
      <Grid
      // style={{ padding: "60px 5px 0 5px" }}
      >
        <Box style={{ maxWidth: 600, margin: "0 auto" }}>
          <Stack spacing={5}>
            <Heading as="h3" size="lg">
              LegendsLaboratory
            </Heading>
            <FormSelection newPage={props.newPage} />
          </Stack>
        </Box>
      </Grid>
    </GridItem>
  )
}

export default LabContractCalls
