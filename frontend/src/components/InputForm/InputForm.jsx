import React, { useState, useEffect } from 'react'
import InputElement from "./InputElement"
import formJSON from './formElement.json'
import { Grid, Box, Button, Stack, Heading } from '@chakra-ui/react'

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

  return (
    <div>
      <Grid style={{ padding: "80px 5px 0 5px" }}>
        <Box style={{ maxWidth: 600, margin: "0 auto" }}>
          {/* <CardContent> */}
          <Stack>
            <form>
              {
                fields ? fields.map((field, i) =>
                  <InputElement key={i} field={field} />
                ) : null
              }
              <Button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</Button>
            </form>
          </Stack>
          {/* <ManageApp title={"Create Promo Event"} subtitle={"Legendary Labs Promo Event"} /> */}
          {/* </CardContent> */}
        </Box>
      </Grid>
    </div>
  )
}

export default InputForm
