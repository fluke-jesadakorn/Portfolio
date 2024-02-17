// pages/contact-work.js
"use client";
import {
  Layout,
  Menu,
  Typography,
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
} from "antd";
import {
  MailOutlined,
  EnvironmentOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function ContactWorkPage() {
  const onFinish = (values: string[]) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Content style={{ padding: 25 }}>
      <Title level={2}>Contact Me</Title>
      <Row gutter={24}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Paragraph>
              <MailOutlined /> jesadakorn.kirtnu@gmail.com
            </Paragraph>
            <Paragraph>{/* <PhoneOutlined /> [Your Phone Number] */}</Paragraph>
            <Paragraph>
              <EnvironmentOutlined /> Kathu Phuket, Thailand
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={16}>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="message"
              rules={[
                { required: true, message: "Please input your message!" },
              ]}
            >
              <TextArea rows={4} placeholder="Message" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Content>
  );
}
