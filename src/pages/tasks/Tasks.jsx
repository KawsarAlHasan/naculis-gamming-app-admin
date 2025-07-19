import { useState } from "react";
import { Table, Tag, Space, Avatar, notification, Modal } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { useAllTasks } from "../../services/tasksService";
import { MdBlock } from "react-icons/md";
import TasksDetails from "./TasksDetails";

const { confirm } = Modal;

function TasksPage() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [detailsData, setDetailsData] = useState(null);
  const [blockLoading, setBlockLoading] = useState(false);

  const { allTasks, pagination, isLoading, isError, error, refetch } =
    useAllTasks(filter);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;


  const handleUserDetails = (userData) => {
    setDetailsData(userData);
    setIsViewModalOpen(true);
  };

  const handleModalClose = () => {
    setDetailsData(null);
    setIsViewModalOpen(false);
  };


  const handleTableChange = (pagination) => {
    setFilter((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };


    const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
      duration: 3,
    });
  }

  
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to Block this Tasks?",
      icon: <ExclamationCircleOutlined />,
      content: "Do you want to Block this Tasks?",
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
      openNotification("success", "Success", "Tasks blocked successfully");
      refetch();
    } catch (error) {
      openNotification("error", "Error", "Failed to block Tasks");
    } finally {
      setBlockLoading(false);
    }
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
      width: 120,
      render: (_, record) => (
        <Tag
          className={`w-full text-center text-[20px] p-3 !border-[1px] ${
            record.status === "Done"
              ? "!border-[#359700]"
              : record.status === "Ongoing"
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

      <TasksDetails
         detailsData={detailsData}
        isOpen={isViewModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default TasksPage;
