/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react";

const ConfirmEmail = () => {
  return (
    <Box as="section">
      <Box maxW="600px" mx="auto" mt="6rem">
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Confirm Email!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            We've sent a confirmation email to your inbox to complete the signup
            process.
          </AlertDescription>
        </Alert>
      </Box>
    </Box>
  );
};

ConfirmEmail.isAuthPage = false;
ConfirmEmail.name = "Confirm Email";

export default ConfirmEmail;
