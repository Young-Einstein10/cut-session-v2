import React from "react";
import Link from "next/link";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Link as ChakraLink,
  InputGroup,
  InputRightElement,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormFields, registerSchema, USERTYPE } from "@/utils/schemas";
import { Button, Input, Select } from "@/components/shared";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { notifyError } from "@/utils/toast";

const Register = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { isOpen, onToggle } = useDisclosure();

  const {
    watch,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormFields>({
    resolver: yupResolver(registerSchema),
  });

  const userType = watch("type");

  const onSubmit = async (values: RegisterFormFields) => {
    const {
      email,
      password,
      studioName,
      cityOfOperation,
      cityOfResidence,
      ...rest
    } = values;

    let payload;

    if (userType === USERTYPE.CLIENT) {
      payload = { ...rest, cityOfResidence };
    } else {
      payload = { ...rest, cityOfOperation, studioName };
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${process.env.NEXT_SITE_URL}/dashboard/${
          userType === USERTYPE.CLIENT ? "client" : "merchant"
        }`,
        data: {
          ...payload,
        },
      },
    });

    if (data.user?.role === "authenticated" && !error) {
      return router.push("/confirm-email");
    }

    if (error) {
      console.log(error);
      return notifyError(
        error.message || "Sorry! An error occurred while creating your account."
      );
    }
  };

  return (
    <Box as="section" minH="100vh" py="3rem">
      <Box
        maxW="400px"
        mx="auto"
        w="full"
        px=".5rem"
        py="1rem"
        bg="#fff"
        border="1px solid #e0e0e0"
      >
        <Heading fontSize="2xl" mb={8} textAlign="center">
          Create an account
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box p={4}>
            <FormControl mb={6} isInvalid={!!errors.email}>
              <FormLabel htmlFor="name" color="#100B05" fontSize="14px">
                Name
              </FormLabel>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                isRequired
                register={register}
              />
              <FormErrorMessage>
                {errors.name && errors.name?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={6} isInvalid={!!errors.email}>
              <FormLabel htmlFor="email" color="#100B05" fontSize="14px">
                Email
              </FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                isRequired
                register={register}
              />
              <FormErrorMessage>
                {errors.email && errors.email?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={6} isInvalid={!!errors.type}>
              <FormLabel htmlFor="type" color="#100B05" fontSize="14px">
                Who are you?
              </FormLabel>

              <Select id="type" px={0} register={register}>
                <option value="" hidden>
                  Who are you?
                </option>
                <option value={USERTYPE.CLIENT}>Client</option>
                <option value={USERTYPE.MERCHANT}>Studio Owner</option>
              </Select>

              <FormErrorMessage>
                {errors.type && errors.type?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mb={6} isInvalid={!!errors.dob}>
              <FormLabel htmlFor="dob" color="#100B05" fontSize="14px">
                Date of Birth
              </FormLabel>
              <Input
                id="dob"
                type="date"
                placeholder="Date of Birth"
                register={register}
              />
              <FormErrorMessage>
                {errors.dob && errors.dob?.message}
              </FormErrorMessage>
            </FormControl>

            {userType === USERTYPE.MERCHANT && (
              <FormControl mb={6} isInvalid={!!errors.studioName}>
                <FormLabel htmlFor="studioName" color="#100B05" fontSize="14px">
                  Studio Name
                </FormLabel>
                <Input
                  id="studioName"
                  type="text"
                  placeholder="Studio Name"
                  register={register}
                />
                <FormErrorMessage>
                  {errors.studioName && errors.studioName?.message}
                </FormErrorMessage>
              </FormControl>
            )}

            {userType === USERTYPE.MERCHANT && (
              <FormControl mb={6} isInvalid={!!errors.cityOfOperation}>
                <FormLabel
                  htmlFor="cityOfOperation"
                  color="#100B05"
                  fontSize="14px"
                >
                  City of Operation
                </FormLabel>
                <Input
                  id="cityOfOperation"
                  type="text"
                  placeholder="City of Operation"
                  register={register}
                />
                <FormErrorMessage>
                  {errors.cityOfOperation && errors.cityOfOperation?.message}
                </FormErrorMessage>
              </FormControl>
            )}

            {userType === USERTYPE.CLIENT && (
              <FormControl mb={6} isInvalid={!!errors.cityOfResidence}>
                <FormLabel
                  htmlFor="cityOfResidence"
                  color="#100B05"
                  fontSize="14px"
                >
                  City of Residence
                </FormLabel>
                <Input
                  id="cityOfResidence"
                  type="text"
                  placeholder="City of Residence"
                  register={register}
                />
                <FormErrorMessage>
                  {errors.cityOfResidence && errors.cityOfResidence?.message}
                </FormErrorMessage>
              </FormControl>
            )}

            <FormControl mb={2} isInvalid={!!errors.password}>
              <FormLabel htmlFor="password" color="#100B05" fontSize="14px">
                Password
              </FormLabel>

              <InputGroup>
                <Input
                  id="password"
                  placeholder="Enter password"
                  type={isOpen ? "text" : "password"}
                  register={register}
                />
                <InputRightElement h="full">
                  <IconButton
                    bg="none"
                    width="32px"
                    onClick={onToggle}
                    height="40px"
                    aria-label="toggle-passwors"
                    icon={
                      isOpen ? (
                        <FiEye size={18} color="#000" />
                      ) : (
                        <FiEyeOff size={18} color="#000" />
                      )
                    }
                    _hover={{
                      bg: "none",
                    }}
                    _active={{
                      bg: "none",
                    }}
                  />
                </InputRightElement>
              </InputGroup>

              <FormErrorMessage>
                {errors.password && errors.password?.message}
              </FormErrorMessage>
            </FormControl>

            <Flex mb={6} justify="flex-end">
              <Link href="/forgot-password" passHref>
                <ChakraLink fontSize="sm" color="brand" fontWeight={500}>
                  Forgot password?
                </ChakraLink>
              </Link>
            </Flex>

            <Button type="submit" isLoading={isSubmitting}>
              Create Account
            </Button>

            <Text mt="1rem" textAlign="center" fontSize="sm">
              Already have an account?{" "}
              <Link href="/login" passHref>
                <ChakraLink
                  _hover={{
                    textDecor: "underline",
                  }}
                >
                  Login here
                </ChakraLink>
              </Link>
            </Text>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

Register.isAuthPage = false;

export default Register;
