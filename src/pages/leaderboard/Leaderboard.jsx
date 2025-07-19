import { useState } from "react";
import { Table, Tag, Space, Avatar, Modal, notification } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { useAllLeaderboard } from "../../services/leaderboardService";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MdBlock } from "react-icons/md";
import UserDetails from "./UserDetails";

const { confirm } = Modal;

dayjs.extend(relativeTime);

function LeaderboardPage() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userDetailsData, setUserDetailsData] = useState(null);
  const [blockLoading, setBlockLoading] = useState(false);

  const { allLeaderboard, pagination, isLoading, isError, error, refetch } =
    useAllLeaderboard(filter);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
      duration: 3,
    });
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to Block this user?",
      icon: <ExclamationCircleOutlined />,
      content: "Do you want to Block this user?",
      okText: "Yes, Block",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        handleBlock(id);
      },
    });
  };

  const handleBlock = async (id) => {
    setBlockLoading(true);
    try {
      console.log(id);
      // await API.delete(`/courses/delete/${id}`);
      openNotification("success", "Success", "User blocked successfully");
      refetch();
    } catch (error) {
      openNotification("error", "Error", "Failed to block user");
    } finally {
      setBlockLoading(false);
    }
  };

  const handleUserDetails = (userData) => {
    setUserDetailsData(userData);
    setIsViewModalOpen(true);
  };

  const handleModalClose = () => {
    setUserDetailsData(null);
    setIsViewModalOpen(false);
  };

  const handleTableChange = (pagination) => {
    setFilter((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };

  const columns = [
    {
      title: <span className="text-[20px]">Rank</span>,
      dataIndex: "rank",
      key: "rank",
      render: (rank) => <span className="text-white text-[16px]">{rank}</span>,
    },
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
      title: <span className="text-[20px]">WX Earned</span>,
      dataIndex: "wx_earned",
      key: "wx_earned",
      render: (wx_earned) => (
        <span className="text-white text-[16px]">{wx_earned}</span>
      ),
    },
    {
      title: <span className="text-[20px]">Country</span>,
      dataIndex: "country",
      key: "country",
      render: (country) => (
        <span className="text-white text-[16px]">{country}</span>
      ),
    },
    {
      title: <span className="text-[20px]">Badge</span>,
      dataIndex: "badge",
      key: "badge",
      render: (badge) => (
        <span className="text-white text-[16px]">{badge}</span>
      ),
    },
    {
      title: <span className="text-[20px]">Last Active</span>,
      dataIndex: "last_active",
      key: "last_active",
      render: (last_active) => {
        const d = new Date(last_active);
        const formatted = dayjs(d).fromNow();
        return <span className="text-white text-[16px]">{formatted}</span>;
      },
    },
    {
      title: <span className="text-[20px]">Action</span>,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined
            onClick={() => handleUserDetails(record)}
            className="text-[23px] cursor-pointer"
          />

          <MdBlock
            className="text-[23px] text-red-400 hover:text-red-300 cursor-pointer"
            loading={blockLoading}
            onClick={() => showDeleteConfirm(1)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="">
      <Table
        columns={columns}
        dataSource={allLeaderboard}
        rowKey="id"
        pagination={{
          current: filter.page,
          pageSize: filter.limit,
          total: pagination.totalLeaderboard,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
        loading={isLoading}
        // bordered
        className="custom-dark-table"
        rowClassName={() => "dark-table-row"}
      />

      <UserDetails
        userDetailsData={userDetailsData}
        isOpen={isViewModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default LeaderboardPage;
