import React, { useEffect, useState } from "react";
import { Modal, Typography, Button, Select, message, Space } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { API } from "../../api/api";

const { Title } = Typography;
const { Option } = Select;

function StatusChange({ payoutData, isOpen, onClose, refetch }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStatus(null);
    }
  }, [isOpen]);

  const handleStatusChange = async () => {
    if (!status) {
      message.warning("Please select a status before submitting.");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        payout_id: payoutData?.payout_id,
        action: status,
      };

      await API.post(`/api/admin_dashboard/payouts/process/`, payload);

      message.success(`Payout ${status}d successfully`);
      refetch?.();
      onClose();
    } catch (error) {
      message.error( error?.response?.data?.error || "Failed to change status. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <Title level={3} className="!text-[#FE7400] !mb-0">
          Change Transaction Status
        </Title>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
      className="status-change-modal"
    >
      <div className="text-center">
        <p>
          Select a new status for payout <b>#{payoutData?.payout_id}</b>.
        </p>

        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Select
            placeholder="Choose a status"
            onChange={(value) => setStatus(value)}
            value={status}
            style={{ width: "100%" }}
          >
            <Option value="approve">
              <CheckCircleOutlined style={{ color: "green", marginRight: 8 }} />
              Approve
            </Option>
            <Option value="reject">
              <CloseCircleOutlined style={{ color: "red", marginRight: 8 }} />
              Reject
            </Option>
            {/* <Option value="fail">
              <StopOutlined style={{ color: "orange", marginRight: 8 }} />
              Fail
            </Option> */}
          </Select>

          <Button
            type="primary"
            block
            onClick={handleStatusChange}
            loading={loading}
            disabled={!status}
          >
            Submit
          </Button>
        </Space>
      </div>

      <style jsx global>{`
        .status-change-modal .ant-modal-body {
          padding: 24px;
        }
        .status-change-modal .ant-typography {
          text-align: center;
        }
      `}</style>
    </Modal>
  );
}

export default StatusChange;
