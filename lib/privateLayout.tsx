"use client";
import { HomeOutlined, BookOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import type Entity from "@ant-design/cssinjs/es/Cache";
import { useServerInsertedHTML } from "next/navigation";
import { Layout, Menu, Typography } from "antd";
import Link from "next/link";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import type { MenuProps, MenuTheme } from "antd/es/menu";
type MenuItem = Required<MenuProps>["items"][number];

const { Paragraph } = Typography;
const { Header, Footer } = Layout;

const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
  const cache = React.useMemo<Entity>(() => createCache(), []);
  const isServerInserted = React.useRef<boolean>(false);
  useServerInsertedHTML(() => {
    if (isServerInserted.current) {
      return;
    }
    isServerInserted.current = true;
    return (
      <style
        id="antd"
        dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
      />
    );
  });

  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(<Link href="/">Home</Link>, "1", <HomeOutlined />),
    getItem(<Link href="/works">Works</Link>, "2", <HomeOutlined />),
    getItem(<Link href="/blog">Blog</Link>, "3", <BookOutlined />),
    getItem(<Link href="/contact">Contact</Link>, "4", <UserOutlined />),
  ];

  return (
    <StyleProvider cache={cache}>
      <Layout className="layout">
        <Header style={{ zIndex: 1, width: "100%" }}>
          <div className="logo" />
          <Menu
            theme="dark"
            items={items}
            mode="horizontal"
            defaultSelectedKeys={["1"]}
          ></Menu>
        </Header>
        <div style={{ minHeight: "82vh" }}>{children}</div>
        <Footer
          style={{
            textAlign: "center",
            minWidth: "100vw",
          }}
        >
          <FacebookOutlined style={{ fontSize: "20px", margin: "0 8px" }} />
          <InstagramOutlined style={{ fontSize: "20px", margin: "0 8px" }} />
          <TwitterOutlined style={{ fontSize: "20px", margin: "0 8px" }} />
          <LinkedinOutlined style={{ fontSize: "20px", margin: "0 8px" }} />
          <Paragraph>Copyright ©2020 All rights reserved</Paragraph>
        </Footer>
      </Layout>
    </StyleProvider>
  );
};

export default StyledComponentsRegistry;
