"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Space,
  DatePicker,
} from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import moment from "moment";
import Highlighter from "react-highlight-words";
moment.locale("en");

interface Vendor {
  key: React.Key;
  vendorId: string;
  name: string;
  address?: string;
  tel?: string;
  staffId?: string;
  createdDate?: moment.Moment;
}

interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

const VendorsPage: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentVendor, setCurrentVendor] = useState<Vendor | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [form] = Form.useForm();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchVendors(pagination.current, pagination.pageSize, searchQuery);
  }, [pagination.current, pagination.pageSize, searchQuery]);

  const fetchVendors = async (
    page: number = 1,
    pageSize: number = 5,
    query: string = ""
  ) => {
    try {
      const response = await axios.get(`/api/vendors`, {
        params: {
          page,
          pageSize,
          query,
        },
      });
      console.log(response.data);
      setVendors(
        response.data.records.map((vendor: Vendor) => ({
          ...vendor,
          key: vendor.vendorId,
        }))
      );
      setPagination((prev) => ({ ...prev, total: response.data.total }));
    } catch (error) {
      message.error("Failed to fetch vendors");
    }
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPagination((prev) => ({
      ...prev,
      current: newPagination.current || prev.current,
      pageSize: newPagination.pageSize || prev.pageSize,
    }));
  };

  const showCreateModal = () => {
    setCurrentVendor(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showUpdateModal = (vendor: Vendor) => {
    setCurrentVendor(vendor);
    form.setFieldsValue({
      ...vendor,
      createdDate: vendor.createdDate ? moment(vendor.createdDate) : null,
    });
    setIsModalVisible(true);
  };

  const showDeleteConfirm = (vendorId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this vendor?",
      content:
        "This action cannot be undone and will permanently delete the vendor data.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, cancel",
      onOk: () => handleDelete(vendorId),
    });
  };

  const handleDelete = async (vendorId: string) => {
    try {
      await axios.delete(`/api/vendors?vendorId=${vendorId}`);
      message.success("Vendor deleted successfully");
      fetchVendors(pagination.current, pagination.pageSize, searchQuery);
    } catch (error) {
      message.error("Failed to delete vendor");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (currentVendor) {
        await axios.put(`/api/vendors/${currentVendor.vendorId}`, {
          ...values,
          createdDate: values.createdDate ? values.createdDate.format() : null,
        });
        message.success("Vendor updated successfully");
      } else {
        await axios.post("/api/vendors", {
          ...values,
          createdDate: values.createdDate ? values.createdDate.format() : null,
        });
        message.success("Vendor created successfully");
      }
      setIsModalVisible(false);
      fetchVendors(pagination.current, pagination.pageSize, searchQuery);
    } catch (error) {
      message.error("Failed to submit vendor");
    }
  };

  const columns: ColumnsType<Vendor> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchQuery]}
          autoEscape={true}
          textToHighlight={text.toString()}
        />
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text: string) => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchQuery]}
          autoEscape={true}
          textToHighlight={text.toString()}
        />
      ),
    },
    {
      title: "Telephone",
      dataIndex: "tel",
      key: "tel",
      render: (text: string) => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchQuery]}
          autoEscape={true}
          textToHighlight={text.toString()}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => showUpdateModal(record)}>Edit</Button>
          <Button danger onClick={() => showDeleteConfirm(record.vendorId)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search vendors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onPressEnter={() => fetchVendors(1, pagination.pageSize, searchQuery)}
        />
        <Button
          onClick={() => fetchVendors(1, pagination.pageSize, searchQuery)}
          icon={<SearchOutlined />}
        >
          Search
        </Button>
      </Space>
      <Button
        type="primary"
        onClick={showCreateModal}
        style={{ marginBottom: 16 }}
      >
        Create Vendor
      </Button>
      <Table
        dataSource={vendors}
        columns={columns}
        rowKey="vendorId"
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
        }}
        onChange={handleTableChange}
      />
      <Modal
        title={currentVendor ? "Edit Vendor" : "Create Vendor"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="staffId"
            label="Staff ID"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input />
          </Form.Item>
          <Form.Item name="tel" label="Telephone">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VendorsPage;
