import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import theme from "@/theme";
import Layout from "@/components/layout";
import { ToastContainer } from "@/utils/toast";
import { AppPropsWithLayout } from "@/utils/types";
import AuthLayout from "@/components/authLayout";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  const { isAuthPage = true, name } = Component;

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ChakraProvider theme={theme}>
        {isAuthPage ? (
          <AuthLayout title={name}>
            <Component {...pageProps} />
          </AuthLayout>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ChakraProvider>
      <ToastContainer />
    </SessionContextProvider>
  );
}

export default MyApp;
