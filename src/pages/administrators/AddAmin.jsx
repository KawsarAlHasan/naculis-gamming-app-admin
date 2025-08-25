import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
import { API } from "../../api/api";

const { Option } = Select;

const AddAdmin = ({ refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleFinish = async (values) => {
    try {
      setLoading(true);

      await API.post("/api/admin_dashboard/create-admin/", values);
      message.success("Admin created successfully!");
      refetch?.();
      setIsModalOpen(false);
    } catch (err) {
      message.error(err.response?.data?.error || "Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        className="my-custom-button mb-2"
        onClick={showModal}
      >
        New Administrators Profile Create
      </Button>

      <Modal
        title="Create New Admin"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter admin email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter admin email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter admin password" },
              {
                min: 8,
                message: "Password must be at least 8 characters long",
              },
            ]}
          >
            <Input.Password placeholder="Enter admin password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              classNames="!my-custom-button"
              htmlType="submit"
              loading={loading}
              block
            >
              Create Admin
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddAdmin;
