import { useState } from "react";
import { Table, Tag, Space, Avatar, Modal,  Select } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MdBlock } from "react-icons/md";
import UserDetails from "./UserDetails";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";
import { useLeaderboards } from "../../api/api";

const { confirm } = Modal;

dayjs.extend(relativeTime);

function LeaderboardPage() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    value: "xp",
  });

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userDetailsData, setUserDetailsData] = useState(null);
  const [rank, setRank] = useState(null);

  const { leaderboardData, isLoading, isError, error, refetch } =
    useLeaderboards(filter);

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }

  const valueName = filter.value == "xp" ? "total_xp" : filter.value == "gems" ? "total_gem" :  filter.value == "streak" ? "total_daily_streak" : "total_lesson_perfected";

  


  const handleUserDetails = (userData, index) => {
    setUserDetailsData(userData);
    setRank(index);
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
      render: (_, __, index) => (
        <span className="text-white text-[16px]">
          #{filter.limit * (filter.page - 1) + index + 1}
        </span>
      ),
    },
    {
      title: <span className="text-[20px]">User Name</span>,
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <Space size="middle">
          <Avatar className="w-[40px] h-[40px]" src={record.profile_picture} />
          <span className="text-white text-[16px]">{text}</span>
        </Space>
      ),
    },
    {
      title: <span className="text-[20px]">{filter.value} Earned</span>,
      dataIndex: `${valueName}`,
      key: `${valueName}`,
      render: (text) => (
        <span className="text-white text-[16px]">{text}</span>
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
      title: <span className="text-[20px]">Action</span>,
      key: "action",
      render: (_, record, index) => (
        <Space size="middle">
          <EyeOutlined
            onClick={() => handleUserDetails(record, filter.limit * (filter.page - 1) + index + 1)}
            className="text-[23px] cursor-pointer"
          />
        </Space>
      ),
    },
  ];

  const handleChange = (value) => {
    setFilter((prev) => ({
      ...prev,
      page: 1,
      limit: 10,
      value: value,
    }));
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{filter.value} Leaderboard</h2>
        <div className="flex gap-2">
          <span className="text-[20px] mt-[2px]">Filter:</span>
          <Select
            defaultValue={filter.value}
            style={{ width: 170 }}
            onChange={handleChange}
            options={[
              { value: "xp", label: "XP" },
              { value: "gems", label: "Gems" },
              { value: "streak", label: "Streak" },
              { value: "perfect-lessons", label: "Perfect Lessons" },
            ]}
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={leaderboardData.results}
        rowKey="id"
        pagination={{
          current: filter.page,
          pageSize: filter.limit,
          total: leaderboardData.count,
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
        valueName={valueName}
        rank={rank}
        value={filter.value}
        isOpen={isViewModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default LeaderboardPage;
