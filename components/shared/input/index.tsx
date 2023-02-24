import React from "react";
import { Input as ChakraInput, InputProps } from "@chakra-ui/react";
import { UseFormRegister } from "react-hook-form";

const Input = ({
  register,
  ...rest
}: InputProps & {
  register?: UseFormRegister<any>;
}) => {
  return (
    <ChakraInput
      height="50px"
      border="1px solid black"
      px="1rem"
      borderRadius="2px"
      {...rest}
      {...(register ? register(rest.id ?? "") : {})}
    />
  );
};

export default Input;
