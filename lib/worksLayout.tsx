"use client";
import React, { useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb, Typography } from "antd";
import {
  HomeOutlined,
  BookOutlined,
  UserOutlined,
  RocketOutlined,
  BankOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import type Entity from "@ant-design/cssinjs/es/Cache";
import { useServerInsertedHTML } from "next/navigation";
import { useRouter } from "next/navigation";

const { Header, Content, Footer } = Layout;
const { Paragraph } = Typography;

const StyledComponentsRegistry = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("Home");
  const router = useRouter();

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

  useEffect(() => {
    // Function to transform the URL path into a readable string for the breadcrumb.
    const formatPath = (path) => {
      const pathString = path.charAt(0).toUpperCase() + path.slice(1);
      return pathString.replace(/-/g, " ");
    };

    // Set the current page based on the URL path.
    if (router.asPath) {
      const pathArray = router.asPath.split("/");
      const page = pathArray[pathArray.length - 1] || "Home";
      setCurrentPage(formatPath(page));
    }
  }, [router.asPath]);

  const items = [
    {
      label: <Link href="/works/EnterpriseXpress">Home</Link>,
      key: "1",
      icon: <HomeOutlined />,
    },
    {
      label: (
        <Link href="/works/EnterpriseXpress/modules/account">Account</Link>
      ),
      key: "2",
      icon: <BankOutlined />,
    },
    {
      label: (
        <Link href="/works/EnterpriseXpress/modules/human-resource">
          Human Resource
        </Link>
      ),
      key: "3",
      icon: <BookOutlined />,
    },
    {
      label: (
        <Link href="/works/EnterpriseXpress/modules/marketing">Marketing</Link>
      ),
      key: "4",
      icon: <UserOutlined />,
    },
    {
      label: (
        <Link href="/works/EnterpriseXpress/modules/operation">Operation</Link>
      ),
      key: "5",
      icon: <RocketOutlined />,
    },
  ];

  const accountItems = [
    {
      path: "/user1",
      breadcrumbName: "User1",
    },
    {
      path: "/user2",
      breadcrumbName: "User2",
    },
    // {
    //   key: "1",
    //   label: (
    //     <a
    //       rel="noopener noreferrer"
    //       href="/works/EnterpriseXpress/modules/account/purchase"
    //     >
    //       Purchase
    //     </a>
    //   ),
    // },
    // {
    //   key: "2",
    //   label: (
    //     <a rel="noopener noreferrer" href="http://www.taobao.com/">
    //       Receipt
    //     </a>
    //   ),
    // },
    // {
    //   key: "3",
    //   label: (
    //     <a rel="noopener noreferrer" href="http://www.tmall.com/">
    //       Navigation
    //     </a>
    //   ),
    // },
  ];

  return (
    <StyleProvider cache={cache}>
      <Layout className="layout">
        {/* <Header style={{ zIndex: 1 }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            items={items}
            defaultSelectedKeys={["1"]}
          />
        </Header> */}
        <Content style={{ padding: "20px 50px" }}>
          <Breadcrumb
            separator=">"
            routes={[
              {
                breadcrumbName: "Home",
                path: "/",
              },
              {
                breadcrumbName: "Account",
                path: "/works/EnterpriseXpress/modules/account",
                children: accountItems,
              },
              {
                breadcrumbName: currentPage,
              },
            ]}
          ></Breadcrumb>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
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
