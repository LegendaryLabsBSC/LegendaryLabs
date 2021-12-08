import React, { useState } from "react";
import {
  Flex,
  Text,
  Input,
  Stack,
  Radio,
  RadioGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const Element = (
  { input: { internalType, name, type },
    register
  }) => {

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
    case "address":
      return (
        <Flex>
          <Input
            w="75%"
            id={name}
            label={name}
            {...register(name)}
            placeholder={`Enter ${name}`}
          />
        </Flex>
      );
    case "bool":
      return (
        <Flex>
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
        </Flex>
      );
    case "uint256":
      return (
        <Flex>
          <NumberInput
            mr="2rem"
            maxW="100px"
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
      return (
        <Text>
          {`Error: ${type} not supported`}
        </Text>
      )
  }
};

export default Element;
