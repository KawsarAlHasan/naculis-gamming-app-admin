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

function PayoutsDetails({ detailsData, isOpen, onClose }) {
  const statusColor = detailsData?.status === "active" ? "green" : "red";
  const statusIcon =
    detailsData?.status === "active" ? (
      <CheckCircleOutlined />
    ) : (
      <CloseCircleOutlined />
    );



  return (
    <Modal
      title={
        <Title level={3} className="!text-[#FE7400] !mb-0">
          Transaction Details
        </Title>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      className="user-details-modal"
    >
    

  <div className="w-full">
    <h1 className="text-[18px] font-bold mb-5 ">Transaction ID: <span className="font-semibold ml-2">#12345678</span></h1>
    <h1 className="text-[18px] font-bold mb-5 ">Plans: <span className="font-semibold ml-2">Monthly Subscription</span> </h1>
    <h1 className="text-[18px] font-bold mb-5 ">Date: <span className="font-semibold ml-2">02-24-2024</span> </h1>
    <h1 className="text-[18px] font-bold mb-5 ">Name: <span className="font-semibold ml-2">{detailsData?.user_name}</span> </h1>
    <h1 className="text-[18px] font-bold mb-5 ">A/C number: <span className="font-semibold ml-2">{detailsData?.user_name}</span> </h1>
    <h1 className="text-[18px] font-bold mb-5 ">Email: <span className="font-semibold ml-2">email@gmail.com</span> </h1>
    <h1 className="text-[18px] font-bold mb-5 ">Transaction amount: <span className="font-semibold ml-2">{detailsData?.amount}</span> </h1>
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

export default PayoutsDetails;
