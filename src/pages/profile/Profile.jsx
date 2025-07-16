import { Avatar, Tabs } from "antd";
import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { MdLockReset } from 'react-icons/md';
import { FaUserEdit } from "react-icons/fa";
import ChangePassword from "../../components/ChangePassword";
import EditProfile from "../../components/EditProfile";

const { TabPane } = Tabs;

function Profile() {
  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="text-center">
          <Avatar
            className="w-[120px] h-[120px] border-white border-[1px]"
            src={
              <img
                src="https://images.news18.com/ibnlive/uploads/2021/08/shah-rukh-khan-01-16300515664x3.jpg"
                alt="avatar"
              />
            }
          />
          <h2 className="text-[30px] font-semibold text-white mt-2">
            Shah Rukh Khan
          </h2>

          <Tabs 
            defaultActiveKey="1" 
            className="custom-tabs mb-6"
          >
            <TabPane
              tab={
                <span className="flex items-center gap-2">
                  <FaUserEdit />
                  <span>Edit Profile</span>
                </span>
              }
              key="1"
            >
              <EditProfile />
            </TabPane>

            <TabPane
              tab={
                <span className="flex items-center gap-2">
                  <MdLockReset />
                  <span>Change Password</span>
                </span>
              }
              key="2"
            >
              <ChangePassword />
            </TabPane>
          </Tabs>
        </div>
      </div>

      <style jsx global>{`
        .custom-tabs .ant-tabs-tab {
          color: #F3F3F3 !important;
          font-size: 16px;
          padding: 12px 16px;
        }
        
        .custom-tabs .ant-tabs-tab:hover {
          color: #FE7400 !important;
        }
        
        .custom-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #FE7400 !important;
          font-weight: 500;
        }
        
        .custom-tabs .ant-tabs-ink-bar {
          background: #FE7400 !important;
          height: 3px !important;
        }
        
        .custom-tabs .ant-tabs-nav::before {
          border-bottom: 1px solid #5d6d7e !important;
        }
        
        .custom-tabs .ant-tabs-tab + .ant-tabs-tab {
          margin-left: 24px;
        }
      `}</style>
    </div>
  );
}

export default Profile;