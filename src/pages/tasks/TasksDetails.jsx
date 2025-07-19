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

function TasksDetails({ detailsData, isOpen, onClose }) {
  const statusColor = detailsData?.status === "active" ? "green" : "red";
  const statusIcon =
    detailsData?.status === "active" ? (
      <CheckCircleOutlined />
    ) : (
      <CloseCircleOutlined />
    );

  console.log(detailsData);

  return (
    <Modal
      title={
        <Title level={3} className="!text-[#FE7400] !mb-0">
          Task Details
        </Title>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      className="user-details-modal"
    >
      {/* <Text type="secondary" className="block mb-6">
        Detailed information about {detailsData?.name}
      </Text> */}

      <div className="text-center mb-6">
        <Avatar
          size={120}
          src={<img src={detailsData?.profile} alt="avatar" />}
          className="border-2 border-[#FE7400]"
        />
        <Title level={3} className="!mt-2 !mb-1">
          {detailsData?.user_name}
        </Title>
        <h3>email@gmail.com</h3>
      </div>

      <Divider className="!my-4" />

      <div className="w-full">
        <h1 className="text-[18px] font-bold mb-5 ">
          Task Type :{" "}
          <span className="font-semibold ml-2">{detailsData?.type}</span>
        </h1>
        <h1 className="text-[18px] font-bold mb-5 ">
          Task Title :<span className="font-semibold ml-2">Slang Quiz 1</span>
        </h1>
        <h1 className="text-[18px] font-bold mb-5 ">
          Assigned Date : <span className="font-semibold ml-2">02-24-2024</span>
        </h1>
      </div>

      <div className="flex justify-between mt-5 gap-4">
        <Button className="my-secondary-button w-full">Cancel</Button>
        <Button className="my-custom-button w-full">Download Invoice</Button>
      </div>

      <style jsx global>{`
        .user-details-modal .ant-modal-body {
          padding: 24px;
        }
      `}</style>
    </Modal>
  );
}

export default TasksDetails;
