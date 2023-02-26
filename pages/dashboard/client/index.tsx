import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  createServerSupabaseClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { SlLocationPin, SlPhone } from "react-icons/sl";
import { BsTelephone } from "react-icons/bs";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { USERTYPE } from "@/utils/schemas";

interface StudioProps {
  id: string;
  name: string;
  dob: string;
  phone?: string;
  type: USERTYPE;
  studioName: string;
  cityOfOperation: string;
  cityOfResidence?: string;
  avatarUrl?: string;
  studioBannerUrl?: string;
  updatedAt: string;
}

export const getServerSideProps: GetServerSideProps<{
  session: Session;
  data?: StudioProps[];
}> = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("type", "merchant");

  console.log({ data, error });

  return {
    props: {
      session,
      data,
    },
  };
};

const ClientDashboard = ({
  session,
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb="2rem">
        <Heading as="h2" mt="2rem" fontWeight={600} fontSize="lg">
          All Available Studios
        </Heading>
      </Flex>

      <Box>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />

          <Stack>
            <CardBody>
              <Heading size="md">Impact Studios</Heading>

              <Text fontSize="sm" py="2">
                Impact Studio is a coffee beverage of Italian origin made with
                espresso and steamed milk.
              </Text>

              <Flex alignItems="center" fontSize="sm">
                <Flex alignItems="center">
                  <Text mr={2}>
                    <SlLocationPin size={16} />{" "}
                  </Text>
                  <Text>Victoria Island</Text>
                </Flex>

                <Flex alignItems="center" ml={4}>
                  <Text mr={2}>
                    <BsTelephone size={16} />{" "}
                  </Text>
                  <Text>09061484681</Text>
                </Flex>
              </Flex>
            </CardBody>

            <CardFooter>
              {/* <Button variant="solid" colorScheme="blue">
                Buy Latte
              </Button> */}
              <Text fontSize="sm" fontWeight="semibold">
                $500 per session
              </Text>
            </CardFooter>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};

export default ClientDashboard;
