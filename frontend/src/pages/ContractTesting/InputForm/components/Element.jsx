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
  }

  switch (type) {
    case "string":
      return (
        <Input
          id={name}
          label={name}
          {...register(name)}
          placeholder={`Enter ${name}`}

        />
      );
    case "bool":
      return (
        <Stack direction="row" spacing={12} >
          <RadioGroup
            id={name}
            label={name}
            value={value.radio}
            onChange={(e) => updateValue(e, 'radio')}
          >
            <Stack direction="row">
              <Radio
                value={"false"}
                {...register(name)}
              >
                No
              </Radio>
              <Radio
                value={"true"}
                {...register(name)}
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
            value={value.num}
            {...register(name)}
            onChange={(e) => updateValue(e, 'num')}
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
