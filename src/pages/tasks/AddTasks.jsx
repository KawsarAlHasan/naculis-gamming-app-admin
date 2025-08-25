import React, { useState } from "react";
import { Button, message, Modal, Radio, Select, Form } from "antd";
import { IoMdAdd } from "react-icons/io";
import { API, useAllGroupList, useAllUsersList } from "../../api/api";

const AddTasks = ({ usersRefetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { alluserList, isLoading } = useAllUsersList();

  const {
    allGroupList,
    isLoading: isLoadingGroup,
    isError,
    error,
    refetch,
  } = useAllGroupList();

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedId(null);
    setSelectedUserId(null);
  };

  const handleCreateTask = async () => {
    if (!selectedId) {
      return message.warning("Please select a group");
    }

    try {
      const payload = {
        group_id: selectedId,
        user_id: selectedUserId,
      };

      await API.post("/api/tasks/admin/create-tasks/", payload);
      message.success("Task created successfully");
      handleCancel();
      usersRefetch?.();
    } catch (error) {
      message.error(error?.response?.data?.error || "Failed to create task");
    }
  };

  return (
    <>
      <Button
        className="my-main-button text-xl !py-5 mb-4"
        type="primary"
        onClick={showModal}
      >
        <IoMdAdd /> Create New Task
      </Button>

      <Modal
        title="Create New Task"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical">
          {/* Select User or Group */}
          <Form.Item label="Select Group">
            <Select
              showSearch
              placeholder="Choose a group"
              value={selectedId}
              onChange={(val) => setSelectedId(val)}
              loading={isLoadingGroup}
              style={{ width: "100%" }}
              optionFilterProp="children"
            >
              {allGroupList?.groups?.map((group) => (
                <Select.Option key={group.group_id} value={group.group_id}>
                  {group.group_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Select User">
            <Select
              showSearch
              placeholder="Choose a user"
              value={selectedUserId}
              onChange={(val) => setSelectedUserId(val)}
              loading={isLoading}
              style={{ width: "100%" }}
              optionFilterProp="children"
            >
              {alluserList?.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              className="my-main-button"
              block
              onClick={handleCreateTask}
              disabled={!selectedId}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddTasks;
