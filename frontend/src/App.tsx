import React, { useState, useEffect } from "react";
import "./App.css";
import InputForm from "./components/InputForm/InputForm";
import FormSelection from "./components/FormSelection/FormSelection";
import {
  Grid,
  Box,
  Button,
  Stack,
  Heading,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";

const App = () => {
  const [page, setPage] = useState(0);

  return (
    <div className="App">
      <Heading as="h1" size="2xl">
        Legendary Labs Testing Portal
      </Heading>

      <Grid
        // h="200px"
        padding="60px 5px 0 5px"
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={4} colSpan={2}>
          <Grid
          // style={{ padding: "60px 5px 0 5px" }}
          >
            <Box style={{ maxWidth: 600, margin: "0 auto" }}>
              <Stack spacing={5}>
                <Heading as="h3" size="lg">
                  LegendsLaboratory
                </Heading>
                <FormSelection newPage={setPage} />
              </Stack>
            </Box>
          </Grid>
        </GridItem>

        <GridItem rowSpan={2} colSpan={2}>
          <InputForm page={page} />
        </GridItem>

        <GridItem rowSpan={2} colSpan={2}>
          <Grid>
            <Box maxWidth={450}  borderWidth={5}>
    
            </Box>
          </Grid>
        </GridItem>

      </Grid>
    </div>
  );
};

export default App;
