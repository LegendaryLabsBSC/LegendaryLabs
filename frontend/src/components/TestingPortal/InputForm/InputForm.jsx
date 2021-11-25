import React, { useState, useEffect } from 'react'
import Element from "./Element"
import formJSON from './formElement.json'
import { Grid, Box, Button, Stack, Heading, HStack, FormLabel, FormControl, GridItem } from '@chakra-ui/react'
import { FormContext } from './FormContext';

const InputForm = (props) => {

  const [elements, setElements] = useState(null);

  useEffect(() => {
    setElements(formJSON[props.page])
  }, [props.page])

  const { fields, page_label } = elements ?? {}

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(elements)
  }

  const handleChange = (id, event) => {
    const newElements = { ...elements }

    newElements.fields.forEach(field => {
      const { field_type, field_id } = field;

      if (id === field_id) {
        switch (field_type) {

          case "slider":
            field['field_value'] = event;
            break;

          case "radio":
            field['field_value'] = event;
            break;

          default:
            field['field_value'] = event.target.value;
            break;
        }
      }
      setElements(newElements)
    });
    console.log(elements)
  }

  //todo: change key from using index
  return (
    // <GridItem rowSpan={2} colSpan={2}>

      <FormContext.Provider value={{ handleChange }}>
        <Grid
        //  style={{ padding: "80px 5px 0 5px" }}
        >
          <Box

            style={{
              maxWidth: 6000,
              // maxHeight={600}
              // margin="auto"
              borderWidth: 5
            }}
          >
            <Stack maxWidth={60}>
              <Box style={{ margin: "5% 15%", padding: "3%", borderWidth: 3 }}>
                <Heading as="h4" size="md">{page_label}</Heading>
              </Box>
              <form>
                {
                  fields ? fields.map((field, i) =>
                    <FormControl align="center" style={{ margin: "1% 3%" }} >
                      <FormLabel fontWeight="bold">{field.field_label}:</FormLabel>
                      <Box maxWidth={300}>
                        <Element key={i} field={field} />
                      </Box>
                    </FormControl>
                  ) : null
                }
                <Button type="submit" style={{ margin: "3% 0" }} onClick={(e) => handleSubmit(e)}>Submit</Button>
              </form>
            </Stack>
          </Box>
        </Grid >
      </FormContext.Provider >
    // </GridItem>
  )
}

export default InputForm
