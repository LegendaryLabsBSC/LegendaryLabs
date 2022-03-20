import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Input,
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  VStack,
  Button,
  Box,
  Flex,
  HStack,
  Switch,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputRightAddon,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { createPromoEvent } from "@/functions/promo-actions";

// todo: convert chakra to mui

type CreatePromoEvent = {
  eventName: string;
  duration: string;
  isUnrestricted: boolean;
  maxTickets: string;
  skipIncubation: boolean;
  promoDNA?: string;
};

const CreatePromoForm = () => {
  const [ticketLimitAllowed, setTicketLimitAllowed] = useState<boolean>(false);
  const [promoDNAAllowed, setpromoDNAAllowed] = useState<boolean>(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePromoEvent>();

  const onSubmit: SubmitHandler<CreatePromoEvent> = (data) => {
    createPromoEvent(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        <FormControl display="flex" alignItems="right" justifyContent="right">
          <FormLabel mb="0">Legends Skip Incubation?</FormLabel>
          <Switch id="skipIncubation" {...register("skipIncubation")} />
        </FormControl>
        <FormControl>
          <FormLabel>Event Name</FormLabel>
          <Input
            id="eventName"
            placeholder="Promo event name"
            {...register("eventName", {
              required: "This is required",
            })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Duration In Days</FormLabel>
          <Input
            id="duration"
            defaultValue={1}
            {...register("duration", {
              required: "This is required",
            })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Promo Type</FormLabel>
          <RadioGroup
            id="isUnrestricted"
            defaultValue="false"
            {...register("isUnrestricted", {
              required: "This is required",
            })}
            onChange={(e) => {
              const isUnrestricted = e === "true";
              setValue("isUnrestricted", isUnrestricted);
            }}
          >
            <Flex gap={12} justify="center">
              <Radio colorScheme="green" value={"false"}>
                Admin Dispersed
              </Radio>
              <Radio colorScheme="yellow" value={"true"}>
                User Dispersed
              </Radio>
            </Flex>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Ticket Limit</FormLabel>
          <HStack pr={3} pl={3}>
            <FormControl>
              <Checkbox
                onChange={(e) => {
                  setTicketLimitAllowed(e.target.checked);
                }}
              >
                Max Ticket Limit?
              </Checkbox>
            </FormControl>
            <Input
              id="maxTickets"
              defaultValue={ticketLimitAllowed ? 1 : undefined}
              isDisabled={!ticketLimitAllowed && true}
              {...register("maxTickets")}
            />
          </HStack>
        </FormControl>
        <FormControl>
          <Flex gap={2}>
            <FormLabel>Promo DNA</FormLabel>
            <Switch onChange={(e) => setpromoDNAAllowed(e.target.checked)} />
          </Flex>
          <Textarea
            id="promoDNA"
            isDisabled={!promoDNAAllowed && true}
            placeholder={"Enter DNA for special promo Legend"}
            {...register("promoDNA")}
          />
        </FormControl>
        <Flex w="100%" justify="right">
          <Button isLoading={isSubmitting} type="submit">
            Create Event
          </Button>
        </Flex>
      </VStack>
    </form>
  );
};

export default CreatePromoForm;

//todo: add tool tips
