/* eslint-disable react/no-unescaped-entities */
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
import { LoginFormFields, loginSchema, USERTYPE } from "@/utils/schemas";
import { Button, Input } from "@/components/shared";
import { useRouter } from "next/router";
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import { notifyError, notifySuccess } from "@/utils/toast";
import { GetServerSideProps } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userType = session?.user.user_metadata;

  if (session)
    return {
      redirect: {
        destination: `/dashboard/${
          userType?.client === USERTYPE.CLIENT ? "client" : "merchant"
        }`,
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

const Login = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { isOpen, onToggle } = useDisclosure();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormFields) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      ...values,
    });

    if (data.user?.role === "authenticated" && !error) {
      const { type: userType } = data.user.user_metadata;
      notifySuccess("Login successful");
      return userType === USERTYPE.MERCHANT
        ? router.push("/dashboard/merchant")
        : router.push("/dashboard/client");
    }

    if (error) {
      console.log(error);
      return notifyError(
        error.message || "Sorry! An error occurred signing you in"
      );
    }
  };

  return (
    <Box as="section" minH="100vh" pt="10rem">
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
          Login to your account
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box p={4}>
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
              Login
            </Button>

            <Text mt="1rem" textAlign="center" fontSize="sm">
              Don't have an account?{" "}
              <Link href="/register" passHref>
                <ChakraLink
                  _hover={{
                    textDecor: "underline",
                  }}
                >
                  Register
                </ChakraLink>
              </Link>
            </Text>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

Login.isAuthPage = false;

export default Login;
