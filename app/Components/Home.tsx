"use client";
import {
  Layout,
  Typography,
  Button,
  Row,
  Col,
  Avatar,
  Space,
  Timeline,
} from "antd";
import Link from "next/link";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const workExperiences = [
  {
    title: "IT and Web and Mobile Developer",
    company: "IMT GROUP COMPANY LIMITED",
    period: "March 2021 - January 2022",
    content: `Spearheaded the development of department-specific web and mobile applications aligned with organizational goals.
              Established IT department resource planning initiatives to accommodate technological advancement and scalability.
              Recommended tools and technologies to augment operational efficiency and productivity.
              Managed workflow processes, adopting best practices for enhanced team coordination and project delivery.`,
  },
  {
    title: "Head Engineer (Bitcoin Miner Machine)",
    company: "TOKEN MINER COMPANY LIMITED",
    period: "January 2022 - August 2024",
    content: `Lead cross-departmental collaboration to craft comprehensive feasibility studies for strategic investment decisions.
              Develop and implement processes for the procurement and maintenance of mining equipment.
              Design and enforce Standard Operating Procedures (SOP) to streamline staff operations.
              Analyze market trends to forecast cryptocurrency selling points and facilitate timely equipment upgrades.
              Architect an organizational structure that optimizes management and team efficiency.
              Orchestrate the design of facility layouts, ensuring operational functionality and safety compliance.
              Drive disaster prevention initiatives, mitigating risks associated with fire and electrical loads.
              Liaise with external service providers to enhance operational capabilities and performance.`,
  },
  {
    title: "Senior Developer (Backend and Frontend)",
    company: "FINSTABLE COMPANY LIMITED",
    period: "January 2022 - Present",
    content: `Applying for a position focused on developing website applications, including both backend and frontend, based on customer requirements.
              Core expertise in Customer Relationship Management (CRM) systems.
              Experienced in implementing role-based approval workflows within applications.`,
  },
];

export default function Home() {
  return (
    <Content style={{ padding: 25 }}>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <Row align="middle" justify="space-between">
          <Col xs={24} sm={24} md={16} lg={18} xl={18}>
            <Title>Hi, I am Jesadakorn Kirtnu</Title>
          </Col>
          <Col xs={24} sm={24} md={8} lg={6} xl={6}>
            <Avatar size={120} src="/fluke.jpeg" style={{ float: "right" }} />
          </Col>
        </Row>

        <Title level={2} style={{ marginTop: "48px" }}>
          Professional Experience
        </Title>
        <Row gutter={24}>
          <Col span={24}>
            <Timeline
              items={workExperiences.map((experience, index) => {
                return {
                  key: index,
                  children: (
                    <>
                      <Title level={4}>{experience.title}</Title>
                      <Title level={5}>{experience.company}</Title>
                      <Text>{experience.period}</Text>
                      <Paragraph>{experience.content}</Paragraph>
                    </>
                  ),
                };
              })}
            />
          </Col>
        </Row>
      </Space>
    </Content>
  );
}
