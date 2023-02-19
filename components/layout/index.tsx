import React, { FC, ReactNode } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  title?: string;
  children: ReactNode;
}

const Layout = ({ title = "Home | CutSession", children }: Props) => {
  return (
    <main className={inter.className}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </main>
  );
};

export default Layout;
