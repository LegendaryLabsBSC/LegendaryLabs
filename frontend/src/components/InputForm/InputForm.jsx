import React, { useState, useEffect } from 'react'
import Element from "./Element"
import formJSON from './formElement.json'
import { Grid, Box, Button, Stack, Heading } from '@chakra-ui/react'
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
        // switch (field_type) {
        // case 'slider':
        // field['field_value'] = event.target.checked;
        // break;

        // default:
        field['field_value'] = event.target.value;
        // break;
        // }
      }
      setElements(newElements)
    });
    console.log(elements)
  }

  return (
    <FormContext.Provider value={{ handleChange }}>
      <Grid
      //  style={{ padding: "80px 5px 0 5px" }}
       >
        <Box
          maxWidth={450}
          // maxHeight={600}
          // margin="auto"
          borderWidth={5}
        >
          <Stack spacing={5}>
            <Heading as="h4" size="md">{page_label}</Heading>
            <form>
              //todo: change key from using index
              {fields ? fields.map((field, i) => <Element key={i} field={field} />) : null}
              <Button type="submit" onClick={(e) => handleSubmit(e)}>Submit</Button>
            </form>
          </Stack>
        </Box>
      </Grid>
    </FormContext.Provider>
  )
}

export default InputForm
