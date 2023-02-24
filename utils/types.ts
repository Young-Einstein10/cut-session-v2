import { Session } from "@supabase/supabase-js";
import { NextPage } from "next";
import type { AppProps } from "next/app";

export type NextPageWithLayout = NextPage<{ initialSession: Session }> & {
  isAuthPage?: boolean;
};

export type AppPropsWithLayout = AppProps<{ initialSession: Session }> & {
  Component: NextPageWithLayout;
};
