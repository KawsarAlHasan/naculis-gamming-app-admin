import { useState } from "react";
import { Table, Tag, Space, Avatar } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useAllFlaggedContent } from "../../services/flaggedContentService";
import FlaggedContentDetails from "./FlaggedContentDetails";

function FlaggedContentPage() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userDetailsData, setUserDetailsData] = useState(null);

  const handleModalClose = () => {
    setUserDetailsData(null);
    setIsViewModalOpen(false);
  };

  const { allFlaggedContent, pagination, isLoading, isError, error, refetch } =
    useAllFlaggedContent(filter);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const handleTableChange = (pagination) => {
    setFilter((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };

  const handleUserDetails = (userData) => {
    setUserDetailsData(userData);
    setIsViewModalOpen(true);
  };

  const columns = [
    {
      title: <span className="text-[20px]">User Name</span>,
      dataIndex: "user_name",
      key: "user_name",
      render: (text, record) => (
        <Space size="middle">
          <Avatar className="w-[40px] h-[40px]" src={record.profile} />
          <span className="text-white text-[16px]">{text}</span>
        </Space>
      ),
    },
    {
      title: <span className="text-[20px]">Type</span>,
      dataIndex: "type",
      key: "type",
      render: (type) => <span className="text-white text-[16px]">{type}</span>,
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
      title: <span className="text-[20px]">Flag Summary</span>,
      dataIndex: "flag_summary",
      key: "flag_summary",
      render: (flag_summary) => (
        <span className="text-white text-[16px]">{flag_summary}</span>
      ),
    },

    {
      title: <span className="text-[20px]">Status</span>,
      key: "status",
      width: 100,
      render: (_, record) => (
        <Tag
        className={`w-full text-center text-[20px] py-3 ${record.status === "Under Review" ? "!border-[1px] !border-[#FE7400B2]" : ""}`}
          color={record.status === "Under Review" ? "#4f6572" : "#FE7400B2"}
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
        dataSource={allFlaggedContent}
        rowKey="id"
        pagination={{
          current: filter.page,
          pageSize: filter.limit,
          total: pagination.totalFlaggedContent,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
        loading={isLoading}
        // bordered
        className="custom-dark-table"
        rowClassName={() => "dark-table-row"}
      />

      <FlaggedContentDetails
        userDetailsData={userDetailsData}
        isOpen={isViewModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default FlaggedContentPage;
