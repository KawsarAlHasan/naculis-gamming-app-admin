import React from "react";
import { Modal, Typography, Button, Tag, Space, message } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";
import { API } from "../../api/api";

const { Title } = Typography;

function PayoutsDetails({ detailsData, isOpen, onClose }) {
  const statusColor =
    detailsData?.status?.toLowerCase() === "approve" ||
    detailsData?.status?.toLowerCase() === "pending"
      ? "blue"
      : "red";

  const isCompleted = detailsData?.status?.toLowerCase() == "completed";

  console.log(statusColor, "statusColor");

  // need status change  ["approve", "reject", "fail"]

  const statusIcon =
    detailsData?.status?.toLowerCase() === "approve" ? (
      <CheckCircleOutlined />
    ) : (
      <CloseCircleOutlined />
    );

  const handleDownload = async () => {
    try {
      const response = await API.get(
        `/api/admin_dashboard/payouts/invoice/${detailsData?.payout_id}/`,
        {
          responseType: "blob",
        }
      );

      const contentDisposition = response.headers["content-disposition"];
      let filename = `script_${detailsData?.payout_id}.pdf`;
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match?.[1]) filename = match[1];
      }

      const blob = new Blob([response.data], { type: "application/pdf" });
      saveAs(blob, filename);
      message.success("File downloaded successfully");
    } catch (error) {
      console.error(error);
      message.error("Failed to download file. Please try again.");
    }
  };

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
        <h1 className="text-[18px] font-bold mb-4">
          Transaction ID:{" "}
          <span className="font-semibold ml-2">
            #{detailsData?.payout_id ?? "N/A"}
          </span>
        </h1>
        <h1 className="text-[18px] font-bold mb-4">
          Date:{" "}
          <span className="font-semibold ml-2">
            {detailsData?.date ?? "N/A"}
          </span>
        </h1>
        <h1 className="text-[18px] font-bold mb-4">
          Name:{" "}
          <span className="font-semibold ml-2">
            {detailsData?.user_name ?? "N/A"}
          </span>
        </h1>
        <h1 className="text-[18px] font-bold mb-4">
          A/C number:{" "}
          <span className="font-semibold ml-2">
            {detailsData?.user_id ?? "N/A"}
          </span>
        </h1>
        <h1 className="text-[18px] font-bold mb-4">
          Email:{" "}
          <span className="font-semibold ml-2">
            {detailsData?.email ?? "email@gmail.com"}
          </span>
        </h1>
        <h1 className="text-[18px] font-bold mb-4">
          Method:{" "}
          <span className="font-semibold ml-2">
            {detailsData?.method ?? "N/A"}
          </span>
        </h1>
        <h1 className="text-[18px] font-bold mb-4">
          Guardian Approval:{" "}
          <span className="font-semibold ml-2">
            {detailsData?.guardian_approval ?? "N/A"}
          </span>
        </h1>
        <h1 className="text-[18px] font-bold mb-4">
          Transaction amount:{" "}
          <span className="font-semibold ml-2">
            {detailsData?.amount ?? "N/A"}
          </span>
        </h1>
        <h1 className="text-[18px] font-bold mb-4">
          {/* color={statusColor} icon={statusIcon} */}
          Status: <Tag className="ml-2">{detailsData?.status ?? "Unknown"}</Tag> 
        </h1>
      </div>

      {isCompleted && (
        <div className="flex justify-between mt-5 gap-4">
          <Button onClick={onClose} className="my-secondary-button w-full">Cancel</Button>
          <Button onClick={handleDownload} className="my-custom-button w-full">
            Download Invoice
          </Button>
        </div>
      )}

      <style jsx global>{`
        .user-details-modal .ant-modal-body {
          padding: 24px;
        }
      `}</style>
    </Modal>
  );
}

export default PayoutsDetails;
