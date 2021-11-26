import React, { useState } from "react";
import { Grid, Box, Stack, Heading, GridItem, Flex } from "@chakra-ui/react";
import ElementSelection from "./components/ElementSelection";

const FormSelection = (props: any) => {
  return (
    // <Box style={{ maxWidth: 600, margin: "0 auto" }}>
      <Stack spacing={5}>
        <Heading as="h3" size="lg">
          LegendsLaboratory
        </Heading>
        <ElementSelection newPage={props.newPage} />
      </Stack>
    // </Box>
  );
};

export default FormSelection;
