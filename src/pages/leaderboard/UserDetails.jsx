import React from "react";
import { Modal } from "antd";
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

function UserDetails({ userDetailsData, isOpen, onClose }) {
  return (
    <Modal
      title={
        <h3 className="text-2xl font-bold text-orange-500 m-0">User Details</h3>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      className="user-details-modal"
    >
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Profile Image */}
        <img
          src={userDetailsData?.profile}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover border-4 border-orange-400"
        />

        {/* Name and Country */}
        <div>
          <h2 className="text-xl font-semibold">{userDetailsData?.user_name}</h2>
          <div className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
            <EnvironmentOutlined />
            <span>{userDetailsData?.country}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h4 className="text-sm text-gray-500">WX Earned</h4>
            <p className="text-lg font-bold text-orange-600">
              {userDetailsData?.wx_earned}
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h4 className="text-sm text-gray-500">Rank</h4>
            <p className="text-lg font-bold text-green-600">
              #{userDetailsData?.rank}
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow col-span-2">
            <h4 className="text-sm text-gray-500">Last Active</h4>
            <p className="text-base font-medium text-gray-700">
              <ClockCircleOutlined className="mr-1" />
              {dayjs(userDetailsData?.last_active).format("YYYY-MM-DD HH:mm")}
            </p>
          </div>
        </div>

        {/* Badge */}
        <div className="mt-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <StarOutlined className="mr-1" />
            Badge: {userDetailsData?.badge}
          </span>
        </div>
      </div>

      {/* Tailwind override for AntD padding */}
      <style jsx global>{`
        .user-details-modal .ant-modal-body {
          padding: 24px;
        }
      `}</style>
    </Modal>
  );
}

export default UserDetails;
