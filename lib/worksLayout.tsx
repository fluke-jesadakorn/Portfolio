"use client";
import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb } from "antd";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import type Entity from "@ant-design/cssinjs/es/Cache";
import { useServerInsertedHTML } from "next/navigation";
import { usePathname } from "next/navigation";

const { Content } = Layout;

interface StyledComponentsRegistryProps {
  children: React.ReactNode;
}

const StyledComponentsRegistry: React.FC<StyledComponentsRegistryProps> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState("Home");
  const cache = React.useMemo<Entity>(() => createCache(), []);
  const isServerInserted = React.useRef<boolean>(false);
  const pathname = usePathname();

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
    const formatPath = (path: string) => {
      const pathString = path.charAt(0).toUpperCase() + path.slice(1);
      return pathString.replace(/-/g, " ");
    };

    // Set the current page based on the URL path.
    if (pathname) {
      const pathArray = pathname.split("/");
      const page = pathArray[pathArray.length - 1] || "Home";
      setCurrentPage(formatPath(page));
    }
  }, [pathname]);

  const accountItems = [
    {
      path: "/purchase",
      breadcrumbName: "Purchase",
    },
    {
      path: "/receipt",
      breadcrumbName: "Receipt",
    },
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
            routes={[
              {
                breadcrumbName: "Home",
                href: "/works/EnterpriseXpress/modules/account",
              },
              {
                breadcrumbName: "Account",
                href: "/works/EnterpriseXpress/modules/account",
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
      </Layout>
    </StyleProvider>
  );
};

export default StyledComponentsRegistry;
