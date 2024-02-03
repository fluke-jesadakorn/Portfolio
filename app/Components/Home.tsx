"use client";

import {
  Layout,
  Typography,
  Button,
  Card,
  Row,
  Col,
  Avatar,
  Space,
  Timeline,
  Form,
  Input,
} from "antd";
import Link from "next/link";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const mockupWorks = [
  { title: "Designing Dashboards", year: "2020", category: "Dashboard" },
  {
    title: "Vibrant Portraits of 2020",
    year: "2018",
    category: "Illustration",
  },
  { title: "36 Days of Malayalam type", year: "2018", category: "Typography" },
];

const workExperiences = [
  {
    title: "Freelance Website and Mobile Fullstack Developer",
    company: "Freelance",
    period: "2018-2020",
    content: `Develop website and mobile application for customer.`,
  },
  {
    title: "Startup Co-Founder",
    company: "Virtual Assistance Project",
    period: "2019-2020",
    content: `Create application for virtual assistance.`,
  },
  {
    title: "Head Engineer",
    company: "Cryptocurrency Mining Farm Project",
    period: "2020-Present",
    content: `In my current role as Head Engineer overseeing the creation of a cryptocurrency mining farm,
      I have demonstrated my capability to coordinate between financial and engineering departments to create comprehensive feasibility studies.
      I am adept at managing complex budgets and working collaboratively with executive, finance, and compliance teams to plan and execute operations.
      My experience includes designing and implementing ASIC mining rooms, working with third-party contractors,
      and ensuring the highest standards of quality through rigorous quality control.`,
  },
];

export default function Home() {
  return (
    <Content style={{ padding: 25 }}>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <Row align="middle" justify="space-between">
          <Col xs={24} sm={24} md={16} lg={18} xl={18}>
            <Title>Hi, I am Jesadakorn</Title>
            <Title level={4}>Head Engineer</Title>
            <Paragraph>
              Driving the engineering of a cutting-edge cryptocurrency mining
              farm, I meld financial acuity with technical prowess to optimize
              operations and quality control.
            </Paragraph>
            <Link href="/Resume.pdf"><Button type="primary">Download Resume</Button></Link>
          </Col>
          <Col xs={24} sm={24} md={8} lg={6} xl={6}>
            <Avatar size={120} src="/fluke.jpeg" style={{ float: "right" }} />
          </Col>
        </Row>

        <Title level={2} style={{ marginTop: "48px" }}>
          Work Experience
        </Title>
        <Row gutter={24}>
          <Col span={24}>
            {/* <Timeline>
                    {workExperiences.map((experience, index) => (
                      <Timeline key={index}>
                        <Title level={4}>{experience.title}</Title>
                        <Title level={5}>{experience.company}</Title>
                        <Text>{experience.period}</Text>
                        <Paragraph>{experience.content}</Paragraph>
                      </Timeline>
                    ))}
                  </Timeline> */}

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

        <Title level={3}>Featured works</Title>
        <Row gutter={16}>
          {mockupWorks.map((work) => (
            <Col span={8} key={work.title}>
              <Card
                hoverable
                cover={<img alt={work.title} src="/fluke.jpeg" />}
              >
                <Card.Meta
                  title={work.title}
                  description={`${work.year} ${work.category}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </Content>
  );
}
