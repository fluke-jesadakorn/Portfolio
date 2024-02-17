"use client";

import { Layout, Typography, Card } from "antd";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const blogPosts = [
  {
    title: "UI Interactions of the week",
    date: "12 Feb 2019",
    categories: ["Express", "Handlebars"],
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    title: "UI Interactions of the week",
    date: "12 Feb 2019",
    categories: ["Express", "Handlebars"],
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
];

export default function GetBlog({
  blogs,
}: {
  blogs?:
    | {
        id: string;
        title: string;
        content: string;
      }[]
}) {
  return (
    <Content style={{ padding: 25 }}>
      <Title level={2}>Blog</Title>
      {blogs?.map((post, index) => (
        <Card key={index} style={{ marginBottom: 24 }}>
          <Title level={4}>{post.title}</Title>
          {/* <Paragraph type="secondary">
            {post.date} | {post.categories.join(", ")}
          </Paragraph> */}
          <Paragraph>{post.content.slice(0, 25)}</Paragraph>
        </Card>
      ))}
    </Content>
  );
}
