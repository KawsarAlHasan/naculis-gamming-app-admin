import React from "react";
import {
  Modal,
  Typography,
  Avatar,
  Divider,
  Tag,
  Row,
  Col,
  Space,
  Statistic,
  Button,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  StarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

function FlaggedContentDetails({ userDetailsData, isOpen, onClose }) {
  const statusColor = userDetailsData?.status === "active" ? "green" : "red";
  const statusIcon =
    userDetailsData?.status === "active" ? (
      <CheckCircleOutlined />
    ) : (
      <CloseCircleOutlined />
    );

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
      <div className="">
        <Space align="center">
          <UserOutlined className="text-[#FE7400] text-[18px]" />
          <Text strong>
            <span className="text-[18px]">Name:</span>
          </Text>
        </Space>
        <Text className="ml-1 mt-1 text-[18px] text-[#1F2937]">
          {userDetailsData?.user_name}
        </Text>
      </div>

      <div className="mt-2">
        <Space align="center">
          <MailOutlined className="text-[#FE7400] text-[18px]" />
          <Text strong>
            <span className="text-[18px]">Text:</span>
          </Text>
        </Space>
        <Text className="ml-1 text-[18px] text-[#1F2937]">
          Don’t your trixt Vexteidingly
        </Text>
      </div>

      <div className="mt-2">
        <Space align="center">
          <ClockCircleOutlined className="text-[#FE7400] text-[18px]" />
          <Text strong>
            <span className="text-[18px] mr-2">Status:</span>
          </Text>
        </Space>

        <Tag
          icon={statusIcon}
          color={statusColor}
          className="!text-sm !py-1 !px-3"
        >
          {userDetailsData?.status}
        </Tag>
      </div>

      <div>
        <h3 className="text-[18px] font-semibold mt-3">AI Summary:</h3>

        <h6> 1. This user’s tone has shited significantly</h6>
        <h6> 2. This user’s tone has shited significantly</h6>
      </div>

      <div className="flex justify-between mt-5 gap-4">
        <Button className="my-secondary-button w-full">Mark as Safe</Button>
        <Button className="my-custom-button w-full" >Issue Warning</Button>
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
