import React, { ReactNode } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import Navbar from "./navbar";
import Footer from "./footer";
import { Box } from "@chakra-ui/react";
import { footerHeight, navHeight } from "@/utils/constants";

const inter = Inter({ subsets: ["latin"] });

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
}

const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  return (
    <div className={inter.className}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <Box
        as="main"
        maxW="container.lg"
        mx="auto"
        minH={`calc(100vh - (${navHeight}px + ${footerHeight}px))`}
      >
        {children}
      </Box>
      <Footer />
    </div>
  );
};

export default AuthLayout;
