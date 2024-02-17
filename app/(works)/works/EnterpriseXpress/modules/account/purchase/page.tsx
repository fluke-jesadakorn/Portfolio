'use client'
import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Space, InputNumber, type TablePaginationConfig } from "antd";
import axios from "axios";
import { ColumnsType } from "antd/es/table";

// Define types for your vendor and pagination
interface Vendor {
  vendorId: number;
  name: string;
  // include other vendor properties as needed
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

  useEffect(() => {
    fetchVendors(pagination.current, pagination.pageSize);
  }, []);

  const fetchVendors = async (
    page: number = pagination.current,
    pageSize: number = pagination.pageSize
  ) => {
    const response = await axios.get(`/api/vendors?page=${page}&pageSize=${pageSize}`);
    setVendors(response.data.records);
    setPagination({
      ...pagination,
      current: page,
      pageSize: pageSize,
      total: response.data.total,
    });
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    fetchVendors(newPagination.current!, newPagination.pageSize!);
  };

  const showCreateModal = () => {
    setCurrentVendor(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showUpdateModal = (vendor: Vendor) => {
    setCurrentVendor(vendor);
    form.setFieldsValue(vendor);
    setIsModalVisible(true);
  };

  const showDeleteConfirm = (vendorId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this vendor?",
      content: "This action cannot be undone and will permanently delete the vendor data.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, cancel",
      onOk: () => handleDelete(vendorId),
    });
  };

  const handleDelete = async (vendorId: number) => {
    try {
      await axios.delete(`/api/vendors?vendorId=${vendorId}`);
      message.success("Vendor deleted successfully");
      fetchVendors(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error("Failed to delete vendor");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (currentVendor) {
        await axios.put("/api/vendors", {
          vendorId: currentVendor.vendorId,
          ...values,
        });
        message.success("Vendor updated successfully");
      } else {
        await axios.post("/api/vendors", values);
        message.success("Vendor created successfully");
      }
      setIsModalVisible(false);
      fetchVendors(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error("Failed to submit vendor");
    }
  };

  // Define column types
  const columns: ColumnsType<Vendor> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    // ... other columns
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button onClick={() => showUpdateModal(record)}>Edit</Button>
          <Button danger onClick={() => showDeleteConfirm(record.vendorId)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showCreateModal}>
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
        visible={isModalVisible}
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
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VendorsPage;
