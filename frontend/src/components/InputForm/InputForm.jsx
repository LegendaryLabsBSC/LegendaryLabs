import React, { useState, useEffect } from 'react'
import Element from "./InputElement"
import formJSON from '../../_tests/formElement.json'
import { Grid, Box, Button } from '@chakra-ui/react'

const InputForm = () => {

  const [elements, setElements] = useState(null);
  useEffect(() => {
    setElements(formJSON[0])

  }, [])

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
          <form>
            {fields ? fields.map((field, i) => <Element key={i} field={field} />) : null}
            <Button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</Button>
          </form>
          {/* <ManageApp title={"Create Promo Event"} subtitle={"Legendary Labs Promo Event"} /> */}
          {/* </CardContent> */}
        </Box>
      </Grid>
    </div>
  )
}

export default InputForm
