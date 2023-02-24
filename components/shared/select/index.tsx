import React from "react";
import { UseFormRegister } from "react-hook-form";
import { Select as ChakraSelect, SelectProps } from "@chakra-ui/react";

const Select = ({
  register,
  children,
  ...rest
}: SelectProps & {
  register?: UseFormRegister<any>;
}) => {
  return (
    <ChakraSelect
      height="50px"
      border="1px solid black"
      px="1rem"
      borderRadius="2px"
      {...rest}
      {...(register ? register(rest.id ?? "") : {})}
    >
      {children}
    </ChakraSelect>
  );
};

export default Select;
