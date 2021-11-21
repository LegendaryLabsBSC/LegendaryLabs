import React from "react";
import {
  Input, Select, Radio, RadioGroup,
  Switch, Stack, FormControl, FormLabel,
  Slider, SliderTrack, SliderFilledTrack,
  SliderThumb, NumberInput, NumberInputField,
  NumberInputStepper, NumberIncrementStepper,
  NumberDecrementStepper, Heading
} from "@chakra-ui/react";


const InputElement = ({
  field: {
    field_type, field_id,
    field_label, field_placeholder,
    field_values, field_default,
    field_options
  },
}) => {

  const [value, setValue] = React.useState("1")

  switch (field_type) {
    case "text":
      return (
          <Input
            id={field_id}
            label={field_label}
            placeholder={field_placeholder}
            values={field_values}
          />
      );
    case "select":
      return (
        <Select placeholder={field_placeholder}>
          {
            field_options.map((o) =>
              <option value={o.value}>{o.label}</option>)
          }

        </Select >
      );
    case "radio":
      return (
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="row">
            {
              field_options.map((o) =>
                <Radio value={o.value}>{o.label}</Radio>)
            }
          </Stack>
        </RadioGroup>
      );
    case "switch":
      return (
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">
            {field_label}
          </FormLabel>
          <Switch defaultChecked={field_default} />
        </FormControl>
      );
    case "slider":
      return (
        <Slider aria-label="slider-ex-1" defaultValue={7} min={0} max={365}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={5} />
        </Slider>
      )

    default:
      return null;
  }
};

export default InputElement;
