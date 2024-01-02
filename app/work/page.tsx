// pages/work.js
"use client";
import { Layout, Menu, Typography, Card, Row, Col } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const workItems = [
  {
    title: "Designing Dashboards",
    year: "2020",
    category: "Dashboard",
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    imageUrl: "/fluke.jpeg", // Replace with your image URL
  },
  {
    title: "Designing Dashboards",
    year: "2020",
    category: "Dashboard",
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    imageUrl: "/fluke.jpeg", // Replace with your image URL
  },
  {
    title: "Designing Dashboards",
    year: "2020",
    category: "Dashboard",
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    imageUrl: "/fluke.jpeg", // Replace with your image URL
  },
  {
    title: "Designing Dashboards",
    year: "2020",
    category: "Dashboard",
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    imageUrl: "/fluke.jpeg", // Replace with your image URL
  },
  {
    title: "Designing Dashboards",
    year: "2020",
    category: "Dashboard",
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    imageUrl: "/fluke.jpeg", // Replace with your image URL
  },
  // ... more work items
];

export default function WorkPage() {
  return (
    <Content style={{ padding: 25 }}>
      <Title level={2}>Work</Title>
      <Row gutter={[16, 16]}>
        {workItems.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={item.title} src={item.imageUrl} />}
            >
              <Title level={4}>{item.title}</Title>
              <Paragraph type="secondary">
                {item.year} | {item.category}
              </Paragraph>
              <Paragraph>{item.content}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </Content>
  );
}
