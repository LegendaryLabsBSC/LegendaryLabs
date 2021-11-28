import React, { useContext, useState } from "react";
import {
  Input, Select, Radio, RadioGroup,
  Switch, Stack, FormControl, FormLabel,
  Slider, SliderTrack, SliderFilledTrack,
  SliderThumb, NumberInput, NumberInputField,
  NumberInputStepper, NumberIncrementStepper,
  NumberDecrementStepper, Heading, Flex
} from "@chakra-ui/react";

import { FormContext } from './FormContext';


const Element = (
  { input: { internalType, name, type }, key }
) => {

  const [value, setValue] = useState(0)
  const [strVal, setStrVal] = useState("")

  const { handleChange } = useContext(FormContext);

  switch (type) {
    case "string":
      return (
        <Input
          // id={key}
          label={name}
          // placeholder={field_placeholder ? field_placeholder : ''}
          value={value}
          onChange={event => handleChange(key, event)}
        />
      );
    case "bool":
      return (
        <Stack direction="row" spacing={12} >
          <RadioGroup
            id={key}
            label={name}
            // placeholder={field_placeholder ? field_placeholder : ''}
            value={value}
            onChange={event => handleChange(key, event)}
          >
            <Stack direction="row">
              <Radio value={0}>No</Radio>
              <Radio value={1}>Yes</Radio>
            </Stack>
          </RadioGroup >
        </Stack>
      );
    case "uint256":
      return (
        <Flex>
          <NumberInput
            maxW="100px"
            mr="2rem"
            // min={field_options.min}
            // max={field_options.max}
            // value={field_value ? field_value : field_options.min}
            value={value}
            onChange={event => handleChange(key, event)}
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
            // value={field_value ? field_value : field_options.min}
            value={value}
            // min={field_options.min}
            // max={field_options.max}
            onChange={event => handleChange(key, event)}
          >
            <SliderTrack >
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb
              fontSize="sm"
              boxSize="32px"
              // children={field_value ? field_value : field_options.min}
              children={value}
            />
          </Slider>
        </Flex>
      )

    //todo: number & ;rightside unit icon dynamic units ?

    default:
      console.log(type)
      return null;
  }
};

export default Element;
