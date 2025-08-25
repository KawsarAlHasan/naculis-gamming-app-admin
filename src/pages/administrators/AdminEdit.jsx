import React, { useState } from "react";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, message } from "antd";
import { API } from "../../api/api";

const AdminEdit = ({ adminProfile, refetch }) => {
  const isSuperAdmin = adminProfile.has_access_to === "superadmin";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleFinish = async (values) => {
    try {
      setLoading(true);

      const submitData = {
        name: values.name,
        email: values.email,
        phone: values.contract,
        role: values.has_access_to,
      };

      await API.put(
        `/admin/administrators/${adminProfile.id}/update/`,
        submitData
      );

      message.success("Admin updated successfully!");
      refetch();
      setIsModalOpen(false);
    } catch (err) {
      console.log(err, "err");
      message.error(err.response?.data?.error || "Failed to update Admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <EditOutlined
        className={`text-[23px] bg-[#006699] p-1 rounded-sm text-white ${
          isSuperAdmin
            ? "!cursor-not-allowed opacity-50"
            : "hover:text-blue-300 cursor-pointer"
        }`}
        onClick={isSuperAdmin ? undefined : showModal}
      />

      <Modal
        title="Update Profile"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            id: adminProfile?.id,
            name: adminProfile?.name,
            email: adminProfile?.email,
            contract: adminProfile?.contract,
            has_access_to: adminProfile?.has_access_to,
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="contract"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Role" name="has_access_to">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminEdit;
