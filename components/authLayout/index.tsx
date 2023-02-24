import React, { ReactNode } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import Navbar from "./navbar";
import Footer from "./footer";

const inter = Inter({ subsets: ["latin"] });

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
}

const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  return (
    <main className={inter.className}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default AuthLayout;
