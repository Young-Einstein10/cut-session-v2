import React, { useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  Flex,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Link as ChakraLink,
  IconButton,
  UnorderedList,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { USERTYPE } from "@/utils/schemas";
import { navHeight } from "@/utils/constants";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const session = useSession();
  const supabase = useSupabaseClient();
  const userMetadata = session?.user.user_metadata;
  const userType = userMetadata?.type;

  //   useEffect(() => {
  //     if (!session) {
  //       router.push("/login");
  //       return;
  //     }
  //   }, [session, router]);

  //   console.log(session);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    return router.push("/login");
  };

  return (
    <Flex as="header" borderBottom="solid 1px #e0e0e0">
      <Flex
        as="nav"
        maxW="container.lg"
        mx="auto"
        justifyContent="space-between"
        alignItems="center"
        height={`${navHeight}px`}
        flex={1}
      >
        <Text fontSize="2xl" fontWeight="bold">
          CutSession
        </Text>

        <UnorderedList
          listStyleType="none"
          display="flex"
          alignItems="center"
          fontSize="md"
          gap={6}
        >
          {userType === USERTYPE.MERCHANT ? (
            <>
              <ListItem>
                <Link href={`${router.pathname}/sessions`} passHref>
                  <ChakraLink>Sessions</ChakraLink>
                </Link>
              </ListItem>
              <ListItem>
                <Link href={`${router.pathname}/available-bookings`} passHref>
                  <ChakraLink>Bookings</ChakraLink>
                </Link>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem>
                <Link href={`${router.pathname}/studios`} passHref>
                  <ChakraLink>Photo Studios</ChakraLink>
                </Link>
              </ListItem>

              <ListItem>
                <Link href={`${router.pathname}/my-bookings`} passHref>
                  <ChakraLink>My Bookings</ChakraLink>
                </Link>
              </ListItem>
            </>
          )}

          <ListItem>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<FaUserCircle size={30} />}
                variant="outline"
              />
              <MenuList minWidth={150}>
                <Link href="/dashboard/profile" passHref>
                  <MenuItem icon={<FaUserCircle />}>Profile</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout} icon={<MdOutlineLogout />}>
                  Log Out
                </MenuItem>
              </MenuList>
            </Menu>
          </ListItem>
        </UnorderedList>
      </Flex>
    </Flex>
  );
};

export default Navbar;
