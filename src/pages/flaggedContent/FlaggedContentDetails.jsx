import React, { useState } from "react";
import { Modal, Typography, Tag, Space, Button, Select, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  ClockCircleOutlined,
  StarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { API } from "../../api/api";

const { Title, Text } = Typography;

function FlaggedContentDetails({ userDetailsData, isOpen, onClose, refetch }) {
  const [selectedStatus, setSelectedStatus] = useState(userDetailsData?.status);
  const [loading, setLoading] = useState(false);

  // Status mapping config
  const statusConfig = {
    Pending: {
      color: "orange",
      icon: <ClockCircleOutlined />,
    },
    Reviewed: {
      color: "blue",
      icon: <StarOutlined />,
    },
    Resolved: {
      color: "green",
      icon: <CheckCircleOutlined />,
    },
    Rejected: {
      color: "red",
      icon: <CloseCircleOutlined />,
    },
  };

  const status = userDetailsData?.status;
  const { color, icon } = statusConfig[status] || {
    color: "default",
    icon: null,
  };

  const handleStatusUpdate = async () => {
    if (!selectedStatus) return;
    setLoading(true);
    try {
      const payload = {
        id: userDetailsData?.id,
        status: selectedStatus,
      };

      await API.post(`/api/admin_dashboard/flagged-content/update/`, payload);

      message.success("Status updated successfully!");
      refetch();
      onClose();
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <Title level={3} className="!text-[#FE7400] !mb-0">
          Flagged Transcript
        </Title>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      className="user-details-modal"
    >
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full !border-4 !border-orange-400">
          <img
            src={userDetailsData?.profile_picture}
            alt="User Avatar"
            className="w-[88px] h-[88px] rounded-full object-cover !border-4 !border-orange-400"
          />
        </div>

        {/* Name and email */}
        <div>
          <h2 className="text-xl font-semibold">{userDetailsData?.username}</h2>
          <div className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
            <span>{userDetailsData?.email}</span>
          </div>
        </div>
      </div>

      {/* Flagged Text */}
      <div className="mt-2">
        <Space align="center">
          <Text strong>
            <span className="text-[18px]">Flagged Reason:</span>
          </Text>
        </Space>
        <Text className="ml-1 text-[18px] text-[#1F2937]">
          {userDetailsData?.flagged_reason}
        </Text>
      </div>

      {/* Flagged Text */}
      <div className="mt-2">
        <Space align="center">
          <Text strong>
            <span className="text-[18px]">Flagged Summary:</span>
          </Text>
        </Space>
        <Text className="ml-1 text-[18px] text-[#1F2937]">
          {userDetailsData?.flag_summary}
        </Text>
      </div>

      {/* Status */}
      <div className="mt-2">
        <Space align="center">
          <Text strong>
            <span className="text-[18px] mr-2">Status:</span>
          </Text>
        </Space>
        <Tag icon={icon} color={color} className="!text-sm !py-1 !px-3">
          {status}
        </Tag>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 mt-5 gap-4">
        <Select
          placeholder="Select Status"
          onChange={(value) => setSelectedStatus(value)}
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Reviewed">Reviewed</Select.Option>
          <Select.Option value="Resolved">Resolved</Select.Option>
          <Select.Option value="Rejected">Rejected</Select.Option>
        </Select>
        <Button
          className="my-main-button w-full"
          type="primary"
          loading={loading}
          onClick={handleStatusUpdate}
        >
          Update Status
        </Button>
      </div>

      <style jsx global>{`
        .user-details-modal .ant-modal-body {
          padding: 24px;
        }
      `}</style>
    </Modal>
  );
}

export default FlaggedContentDetails;
