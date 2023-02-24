import React from "react";
import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

const Button = (props: ButtonProps) => {
  return (
    <ChakraButton
      variant="solid"
      bg="black"
      colorScheme="white"
      w="full"
      h="50px"
      borderRadius="2px"
      {...props}
    >
      {props.children}
    </ChakraButton>
  );
};

export default Button;
