"use client";

import { Layout, Typography, Card } from "antd";
import useSWR from "swr";

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

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function BlogPage() {
  const {
    data,
    error,
    isLoading,
  }: {
    data: [{ title: string; content: string }];
    error: any;
    isLoading: boolean;
  } = useSWR("/api/blog", fetcher);

  if (error) return <div>failed to load</div>;
  else if (isLoading) return <div>loading...</div>;
  return (
    <Content style={{ padding: 25 }}>
      <Title level={2}>Blog</Title>
      {data.map((post, index) => (
        <Card key={index} style={{ marginBottom: 24 }}>
          <Title level={4}>{post.title}</Title>
          {/* <Paragraph type="secondary">
            {post.date} | {post.categories.join(", ")}
          </Paragraph> */}
          <Paragraph>{post.content}</Paragraph>
        </Card>
      ))}
    </Content>
  );
}
