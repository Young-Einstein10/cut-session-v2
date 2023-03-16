import { Session } from "@supabase/supabase-js";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { USERTYPE } from "./schemas";

export type NextPageWithLayout = NextPage<{ initialSession: Session }> & {
  isAuthPage?: boolean;
};

export type AppPropsWithLayout = AppProps<{ initialSession: Session }> & {
  Component: NextPageWithLayout;
};

export interface StudioProps {
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
