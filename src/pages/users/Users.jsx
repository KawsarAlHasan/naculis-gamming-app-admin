import { useState } from "react";
import { Table, Tag, Space, Avatar, Modal, notification } from "antd";
import { MdBlock } from "react-icons/md";
import UserDetailsModal from "./UserDetailsModal";

import { EyeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";
import { API, useUsers } from "../../api/api";

const { confirm } = Modal;

function UsersPage() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userDetailsData, setUserDetailsData] = useState(null);
  const [blockLoading, setBlockLoading] = useState(false);

  const { users, isLoading, isError, error, refetch } = useUsers(filter);

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
      duration: 3,
    });
  };

  const showDeleteConfirm = (userData) => {
    const statusData = userData.action == "block" ? "Block" : "Unblock";

    confirm({
      title: `Are you sure you want to ${statusData} this user?`,
      icon: <ExclamationCircleOutlined />,
      content: `Do you want to ${statusData} this user?`,
      okText: `Yes, ${statusData}`,
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        return handleBlock(userData);
      },
    });
  };

  const handleBlock = async (userData) => {
    setBlockLoading(true);
    try {
      const statusData = userData.action == "block" ? "block" : "unblock";
      const id = userData.id;

      const submitData = {
        action: statusData,
        user_id: id,
      };

      const response = await API.post(
        `/api/admin_dashboard/block-unblock/`,
        submitData
      );

      openNotification("success", "Success", `User ${statusData} successfully`);
      refetch();
    } catch (error) {
      openNotification("error", "Error", "Failed to block user");
      return Promise.reject(error);
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

  const handleTableChange = (pagination, filters, sorter) => {
    setFilter((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };

  const columns = [
    {
      title: <span className="text-[20px] !text-center">User</span>,
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space size="middle">
          <Avatar className="w-[40px] h-[40px]" src={record.profile_picture} />
          <span className="text-white text-[16px]">{text}</span>
        </Space>
      ),
    },
    {
      title: <span className="text-[20px]">Age</span>,
      dataIndex: "age",
      key: "age",
      render: (age) => <span className="text-white text-[16px]">{age}</span>,
    },
    {
      title: <span className="text-[20px]">Email</span>,
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <span className="text-white text-[16px]">{email}</span>
      ),
    },
    {
      title: <span className="text-[20px]">Location</span>,
      dataIndex: "location",
      key: "location",
      render: (location) => (
        <span className="text-white text-[16px]">{location}</span>
      ),
    },
    {
      title: <span className="text-[20px]">XP Earned</span>,
      dataIndex: "xp_earned",
      key: "xp_earned",
      render: (xp) => (
        <span className="text-white text-[16px]">{xp.toLocaleString()}</span>
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
          {record.status === "active" ? "Active" : "Inactive"}
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
            className="text-[23px] cursor-pointer"
          />

          <MdBlock
            className="text-[23px] text-red-400 hover:text-red-300 cursor-pointer"
            loading={blockLoading}
            onClick={() => showDeleteConfirm(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="">
      <Table
        columns={columns}
        dataSource={users.results}
        rowKey="id"
        pagination={{
          current: filter.page,
          pageSize: filter.limit,
          total: users.count,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
        loading={isLoading}
        // bordered
        className="custom-dark-table"
        rowClassName={() => "dark-table-row"}
      />

      <UserDetailsModal
        userDetailsData={userDetailsData}
        isOpen={isViewModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default UsersPage;
