import React from "react";
import { Modal } from "antd";
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

function UserDetails({
  rank,
  userDetailsData,
  valueName,
  value,
  isOpen,
  onClose,
}) {
  // console.log( "userDetailsData", userDetailsData);

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
       <div className="w-24 h-24 rounded-full !border-4 !border-orange-400">
         <img
          src={userDetailsData?.profile_picture}
          alt="User Avatar"
          className="w-[88px] h-[88px] rounded-full object-cover !border-4 !border-orange-400"
        />
       </div>

        {/* Name and Country */}
        <div>
          <h2 className="text-xl font-semibold">{userDetailsData?.username}</h2>
          <div className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
            <EnvironmentOutlined />
            <span>{userDetailsData?.country}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h4 className="text-sm text-gray-500">{value} Earned</h4>
            <p className="text-lg font-bold text-orange-600">
              {userDetailsData?.[valueName]}
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h4 className="text-sm text-gray-500">Rank</h4>
            <p className="text-lg font-bold text-green-600">#{rank}</p>
          </div>
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
