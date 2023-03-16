import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { SlLocationPin } from "react-icons/sl";
import { BsTelephone } from "react-icons/bs";
import { useRouter } from "next/router";
import { generateUrlSlug } from "@/utils/helpers";
import { StudioProps } from "@/utils/types";

interface StudioItemProps {
  studio: StudioProps;
}

const StudioItem = ({ studio }: StudioItemProps) => {
  const router = useRouter();

  return (
    <Link
      href={`${router.pathname}/${generateUrlSlug(studio.studioName)}}`}
      passHref
    >
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        _hover={{
          boxShadow:
            "0 0 #0000, 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)",
        }}
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
    </Link>
  );
};

export default StudioItem;
