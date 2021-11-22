import React, { useContext } from "react";
import {
  Input, Select, Radio, RadioGroup,
  Switch, Stack, FormControl, FormLabel,
  Slider, SliderTrack, SliderFilledTrack,
  SliderThumb, NumberInput, NumberInputField,
  NumberInputStepper, NumberIncrementStepper,
  NumberDecrementStepper, Heading
} from "@chakra-ui/react";

import { FormContext } from './FormContext';


const Element = ({
  field: {
    field_type, field_id,
    field_label, field_placeholder,
    field_value, field_default,
    field_options
  },
}) => {

  // const [values, setValue] = React.useState("1")
  const [sliderValue, setSliderValue] = React.useState(0)

  const { handleChange } = useContext(FormContext);

  switch (field_type) {
    case "text":
      return (
        <Input
          id={field_id}
          // label={field_label}
          placeholder={field_placeholder ? field_placeholder : ''}
          value={field_value}
          onChange={event => handleChange(field_id, event)}
        />
      );
    case "select":
      return (
        <Select
          id={field_id}
          // label={field_label}
          placeholder={field_placeholder ? field_placeholder : ''}
          value={field_value}
          onChange={event => handleChange(field_id, event)}
        >
          {
            field_options.map((o) =>
              <option value={o.value}>{o.label}</option>)
          }
        </Select >
      );
    case "radio":
      return (
        // <RadioGroup onChange={setValue} value={values}>
        <RadioGroup
          id={field_id}
          // label={field_label}
          placeholder={field_placeholder ? field_placeholder : ''}
          value={field_value}
          onChange={event => handleChange(field_id, event)}
        >
          <Stack direction="row">
            {
              field_options.map((o) =>
                <Radio value={o.value}>{o.label}</Radio>)
            }
          </Stack>
        </RadioGroup >
      );
    case "switch":
      return (
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">
            {field_label}
          </FormLabel>
          <Switch
            defaultChecked={field_default}
            id={field_id}
            // label={field_label}
            placeholder={field_placeholder ? field_placeholder : ''}
            value={field_value}
            onChange={event => handleChange(field_id, event)}
          />
        </FormControl>
      );
    case "slider":
      return (
        <Slider
          flex="1" focusThumbOnChange={false}
          value={field_value} defaultValue={field_options.default}
          min={field_options.min} max={field_options.max}
          onChange={event => handleChange(field_id, event)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb fontSize="sm" boxSize="32px" children={sliderValue} placeholder="1" />
        </Slider>
      )

    //todo: number

    default:
      return null;
  }
};

export default Element;
