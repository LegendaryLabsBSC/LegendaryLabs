import React, { useContext, useState } from "react";
import {
  Input,
  Radio,
  RadioGroup,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
  Flex,
  Text
} from "@chakra-ui/react";

import { FormContext } from './FormContext';


const Element = (
  { input: { internalType, name, type }, key, register }
) => {

  const [value, setValue] = useState({
    radio: "false",
    num: 0
  })

  const updateValue = (val, type) => {
    setValue({
      ...value,
      [type]: val
    })
    console.log(val, type)
  }

  switch (type) {
    case "string":
      return (
        <Input
          // id={key}
          id={name}
          label={name}
          {...register(name, {
            // required: 'This is required',
            // minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        // placeholder={field_placeholder ? field_placeholder : ''}
        // value={strVal}
        // onChange={event => handleChange(key, event)}
        // onChange={event => handleChange(name, event)}
        // onChange={event => console.log(event)}

        />
      );
    case "bool":
      return (
        <Stack direction="row" spacing={12} >
          <RadioGroup
            // id={key}
            id={name}
            label={name}
            // defaultValue={0}
            // placeholder={field_placeholder ? field_placeholder : ''}
            // radioValue={radioValue}
            value={value.radio}
            onChange={(e) => updateValue(e, 'radio')}
          // onChange={setValue}
          >
            <Stack direction="row">
              <Radio
                // radioValue={"false"}
                value={"false"}
                {...register(name, {
                  // required: 'This is required',
                  // minLength: { value: 4, message: 'Minimum length should be 4' },
                })}
              >
                No
              </Radio>
              <Radio
                // radioValue={"true"}
                value={"true"}
                {...register(name, {
                  // required: 'This is required',
                  // minLength: { value: 4, message: 'Minimum length should be 4' },
                })}
              >
                Yes
              </Radio>
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
            value={value.num}
            {...register(name, {
              // required: 'This is required',
              // minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
            onChange={(e) => updateValue(e, 'num')}
          // onChange={event => handleChange(key, event)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      )

    default:
      console.log(`Error: ${type} not supported`)
      return <Text>
        {`Error: ${type} not supported`}
      </Text>
  }
};

export default Element;
