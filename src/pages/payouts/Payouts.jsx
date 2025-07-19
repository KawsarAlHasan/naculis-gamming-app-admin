import { useState } from "react";
import { Table, Tag, Space, Avatar } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useAllPayouts } from "../../services/payoutService";
import PayoutsDetails from "./PayoutsDetails";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";

function PayoutsPage() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [detailsData, setDetailsData] = useState(null);

  const handleModalClose = () => {
    setDetailsData(null);
    setIsViewModalOpen(false);
  };

  const handleUserDetails = (userData) => {
    setDetailsData(userData);
    setIsViewModalOpen(true);
  };

  const { allPayouts, pagination, isLoading, isError, error, refetch } =
    useAllPayouts(filter);

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }

  const handleTableChange = (pagination) => {
    setFilter((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };

  const columns = [
    {
      title: <span className="text-[20px]">User Name</span>,
      dataIndex: "user_name",
      key: "user_name",
      render: (text, record) => (
        <Space size="middle">
          {console.log(record)}
          <Avatar className="w-[40px] h-[40px]" src={record.profile} />
          <span className="text-white text-[16px]">{text}</span>
        </Space>
      ),
    },
    {
      title: <span className="text-[20px]">Amount</span>,
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span className="text-white text-[16px]">${amount}</span>
      ),
    },
    {
      title: <span className="text-[20px]">method</span>,
      dataIndex: "method",
      key: "method",
      render: (method) => (
        <span className="text-white text-[16px]">{method}</span>
      ),
    },
    {
      title: <span className="text-[20px]">Date</span>,
      dataIndex: "date",
      key: "date",
      render: (date) => {
        const d = new Date(date);
        const formatted = `${String(d.getDate()).padStart(2, "0")}-${String(
          d.getMonth() + 1
        ).padStart(2, "0")}-${d.getFullYear()}`;
        return <span className="text-white text-[16px]">{formatted}</span>;
      },
    },
    {
      title: <span className="text-[20px]">Guardian Approval</span>,
      dataIndex: "guardian_approval",
      key: "guardian_approval",
      render: (guardian_approval) => (
        <span className="text-white text-[16px]">{guardian_approval}</span>
      ),
    },

    {
      title: <span className="text-[20px]">Status</span>,
      key: "status",
      width: 120,
      render: (_, record) => (
        <Tag
          className={`w-full text-center text-[20px] p-3 !border-[1px] ${
            record.status === "Approved"
              ? "!border-[#359700]"
              : record.status === "Pending"
              ? "!border-[#FE7400]"
              : "!border-[#6b1c1c]"
          }`}
          color="#4f6572"
        >
          {record.status}
        </Tag>
      ),
    },
    {
      title: <span className="text-[20px]">Action</span>,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined
            onClick={() => handleUserDetails(record)}
            className="text-[23px]"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="">
      <Table
        columns={columns}
        dataSource={allPayouts}
        rowKey="id"
        pagination={{
          current: filter.page,
          pageSize: filter.limit,
          total: pagination.totalPayOuts,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
        loading={isLoading}
        // bordered
        className="custom-dark-table"
        rowClassName={() => "dark-table-row"}
      />

      <PayoutsDetails
        detailsData={detailsData}
        isOpen={isViewModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default PayoutsPage;
