import React from "react";
import { Box, Flex, Heading, IconButton, Image, Text } from "@chakra-ui/react";
import { SlLocationPin } from "react-icons/sl";
import { BsTelephone } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Calendar from "@/components/client/calendar";

const StudioDetail = () => {
  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Heading as="h2" fontSize="26px" fontWeight={600}>
            Impact Studio
          </Heading>
          <Flex mt={2} alignItems="center" fontSize="sm">
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
        </Box>

        <Box>
          <IconButton icon={<FaHeart />} aria-label="Like" />
        </Box>
      </Flex>

      <Box mt={6} mb={6} height="400px" borderRadius="2xl" bg="gray.300">
        {/* <Image
          borderRadius="2xl"
          //   objectFit="cover"
          maxW={{ base: "100%" }}
          w="full"
          h="auto"
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        /> */}
      </Box>

      <Text fontSize="md">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, alias,
        provident aspernatur quaerat placeat veritatis culpa officiis blanditiis
        totam, ducimus eaque. Itaque eveniet similique ut molestias omnis
        quaerat, autem dolore!
      </Text>

      <Box mt="2rem">
        <Heading as="h3" size="md" mb={6} fontWeight={600}>
          Book a Session
        </Heading>

        <Calendar />
      </Box>
    </Box>
  );
};

export default StudioDetail;
