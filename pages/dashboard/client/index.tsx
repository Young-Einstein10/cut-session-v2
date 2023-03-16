import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import {
  createServerSupabaseClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { StudioProps } from "@/utils/types";
import StudioItem from "@/components/client/studioItem";
import { USERTYPE } from "@/utils/schemas";

interface IServerReturnedProps {
  session: Session;
  data?: StudioProps[];
}

export const getServerSideProps = (async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const userMetadata = session?.user.user_metadata;
  const userType = userMetadata?.type;

  if (userType === USERTYPE.MERCHANT) {
    return {
      notFound: true,
    };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("type", "merchant");

  return {
    props: {
      session,
      data,
    },
  };
}) as GetServerSideProps<IServerReturnedProps>;

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
        <StudioItem studio={data![0]} />
      </Box>
    </Box>
  );
};

export default ClientDashboard;
