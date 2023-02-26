import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { footerHeight } from "@/utils/constants";

const Footer = () => {
  return (
    <Box as="footer" bg="blackAlpha.900" color="whiteAlpha.900">
      <Flex
        maxW="container.lg"
        mx="auto"
        height={`${footerHeight}px`}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="2xl" fontWeight="bold">
          CutSession
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
