import { useState } from "react";
import { Table, Tag, Space, Avatar } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useAllLeaderboard } from "../../services/leaderboardService";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function LeaderboardPage() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });

  const { allLeaderboard, pagination, isLoading, isError, error, refetch } =
    useAllLeaderboard(filter);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

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
          <EyeOutlined className="text-[23px]" />
          <DeleteOutlined className="text-[23px] text-red-400 hover:text-red-300" />
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
    </div>
  );
}

export default LeaderboardPage;
