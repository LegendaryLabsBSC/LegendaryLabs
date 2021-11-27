import React, { useContext } from "react";
import {
  Input, Select, Radio, RadioGroup,
  Switch, Stack, FormControl, FormLabel,
  Slider, SliderTrack, SliderFilledTrack,
  SliderThumb, NumberInput, NumberInputField,
  NumberInputStepper, NumberIncrementStepper,
  NumberDecrementStepper, Heading, Flex
} from "@chakra-ui/react";

import { FormContext } from './FormContext';


const Element = ({
  field: {
    field_type, field_id,
    field_label, field_placeholder,
    field_value, field_default,
    field_options, field_conditional
  }
}) => {

  const { handleChange } = useContext(FormContext);

  //todo:
  const showConditional = (value) => {
    console.log(value)
    if (value === "false") return;

    return (
      <NumberInput
        maxW="100px"
        mr="2rem"
        // size="sm"
        // min={field_options.min}
        // max={field_options.max}
        // value={field_value ? field_value : field_options.min}
        onChange={event => handleChange(field_id, event)}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    )
  }

  switch (field_type) {
    case "text":
      return (
        <Input
          id={field_id}
          label={field_label}
          placeholder={field_placeholder ? field_placeholder : ''}
          value={field_value}
          onChange={event => handleChange(field_id, event)}
        />
      );
    case "select":
      return (
        <Select
          id={field_id}
          label={field_label}
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
        <Stack direction="row" spacing={12} >
          <RadioGroup
            id={field_id}
            label={field_label}
            placeholder={field_placeholder ? field_placeholder : ''}
            value={field_value}
            onChange={event => handleChange(field_id, event)}
          // onChange={event => showConditional(event)}
          >
            <Stack direction="row">
              {
                field_options.map((o) =>
                  <Radio value={o.value}>{o.label}</Radio>)
              }
            </Stack>
          </RadioGroup >
          {field_conditional ? showConditional(field_value) : null}
        </Stack>
      );
    case "switch":
      return (
        <FormControl display="flex">
          <FormLabel mb="0" >
            {field_label}
          </FormLabel>
          <Switch
            defaultChecked={field_default}
            id={field_id}
            label={field_label}
            placeholder={field_placeholder ? field_placeholder : ''}
            value={field_value}
            onChange={event => handleChange(field_id, event)}
          />
        </FormControl>
      );
    case "slider":
      return (
        <Flex>
          <NumberInput
            maxW="100px"
            mr="2rem"
            min={field_options.min}
            max={field_options.max}
            value={field_value ? field_value : field_options.min}
            onChange={event => handleChange(field_id, event)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Slider
            flex="1"
            focusThumbOnChange={false}
            value={field_value ? field_value : field_options.min}
            min={field_options.min}
            max={field_options.max}
            onChange={event => handleChange(field_id, event)}
          >
            <SliderTrack >
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb fontSize="sm" boxSize="32px" children={field_value ? field_value : field_options.min} />
          </Slider>
        </Flex>
      )

    //todo: number & ;rightside unit icon "days"

    default:
      return null;
  }
};

export default Element;
