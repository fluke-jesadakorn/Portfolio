import React, { memo } from "react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { NextPage } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jesadakorn Kirtnu",
  description: "My resume and portfolio website.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: NextPage<RootLayoutProps> = memo(({ children }) => {
  return <div>{children}</div>;
});
RootLayout.displayName = "ExterPriceXpressLayout";
export default RootLayout;
