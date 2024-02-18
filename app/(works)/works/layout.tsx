import React, { ReactElement, memo } from "react";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/lib/worksLayout";
// import "./globals.css";
import "@/styles/globalStyles.scss";
import Head from "next/head";
import { NextPage } from "next";

const inter = Inter({ subsets: ["latin"] });

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: NextPage<RootLayoutProps> = memo(({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Head>
            {/* several domains list the same content, make sure google knows we mean this one. */}
            <link
              // href={`https://reactresume.com${pathname}`}
              key="canonical"
              rel="canonical"
            />

            <link href="/favicon.ico" rel="icon" sizes="any" />
            <link href="/icon.svg" rel="icon" type="image/svg+xml" />
            <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
            <link href="/site.webmanifest" rel="manifest" />

            {/* Open Graph : https://ogp.me/ */}
            <meta
              // content={`https://reactresume.com${pathname}`}
              property="og:url"
            />

            {/* Twitter: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup */}
          </Head>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
});
RootLayout.displayName = "RootLayout";
export default RootLayout;
