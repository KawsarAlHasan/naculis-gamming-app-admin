import { useState } from "react";
import { Table, Tag, Space, Avatar, Modal, notification } from "antd";
import { MdBlock } from "react-icons/md";
// import UserDetailsModal from "./UserDetailsModal";

import { EyeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";
import { API, useAllAdminList, useUsers } from "../../api/api";
import AddAdmin from "./AddAmin";

const { confirm } = Modal;

function Admins() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userDetailsData, setUserDetailsData] = useState(null);
  const [blockLoading, setBlockLoading] = useState(false);

  const { allAdmins, isLoading, isError, error, refetch } = useAllAdminList();

  console.log("allAdmins", allAdmins);

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
      title: `Are you sure you want to ${statusData} this Admin?`,
      icon: <ExclamationCircleOutlined />,
      content: `Do you want to ${statusData} this Admin?`,
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
      title: <span className="text-[20px] !text-center">Admin</span>,
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space size="middle">
          <span className="text-white text-[16px]">{text}</span>
        </Space>
      ),
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
      title: <span className="text-[20px]">Role</span>,
      dataIndex: "role",
      key: "role",
      render: (role) => <span className="text-white text-[16px]">{role}</span>,
    },

    {
      title: <span className="text-[20px]">Action</span>,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
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
      <AddAdmin refetch={refetch} />
      <Table
        columns={columns}
        dataSource={allAdmins}
        rowKey="id"
        pagination={{
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
        loading={isLoading}
        // bordered
        className="custom-dark-table"
        rowClassName={() => "dark-table-row"}
      />

      {/* <UserDetailsModal
        userDetailsData={userDetailsData}
        isOpen={isViewModalOpen}
        onClose={handleModalClose}
      /> */}
    </div>
  );
}

export default Admins;
