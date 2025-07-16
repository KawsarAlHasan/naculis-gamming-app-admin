import { useState } from "react";
import { Table, Tag, Space, Avatar } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useAllTasks } from "../../services/tasksService";

function TasksPage() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });

  const { allTasks, pagination, isLoading, isError, error, refetch } =
    useAllTasks(filter);

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
      title: <span className="text-[20px]">Completion</span>,
      dataIndex: "completion",
      key: "completion",
      render: (completion) => (
        <span className="text-white text-[16px]">{completion}</span>
      ),
    },

    {
      title: <span className="text-[20px]">Status</span>,
      key: "status",
      render: (_, record) => (
        <Tag
          className="w-full mr-5 text-center text-[20px] py-3"
          color={record.status === "active" ? "#359700" : "#FE7400B2"}
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
        dataSource={allTasks}
        rowKey="id"
        pagination={{
          current: filter.page,
          pageSize: filter.limit,
          total: pagination.totalTasks,
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

export default TasksPage;
