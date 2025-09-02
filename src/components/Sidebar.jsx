import { Menu } from "antd";
import {
  AppstoreOutlined,
  ContainerOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { MdOutlinePayment, MdLeaderboard } from "react-icons/md";
import { FaBuildingFlag } from "react-icons/fa6";
import { SlBadge } from "react-icons/sl";
import { signOutAdmin } from "../api/api";
import { MdOutlineAdminPanelSettings } from "react-icons/md";



const { SubMenu } = Menu;

const Sidebar = ({ onClick }) => {
  const location = useLocation();

  const navigate = useNavigate();
  const handleSignOut = () => {
    signOutAdmin();
    navigate("/login");
  };

  // Determine the selected key based on current route
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === "/") return ["1"];
    if (path === "/users") return ["2"];
    if (path === "/flagged-content") return ["3"];
    if (path === "/payouts") return ["4"];
    if (path === "/tasks") return ["5"];
    if (path === "/leaderboard") return ["6"];
    if (path === "/administrators") return ["administrators"];
    if (path === "/profile") return ["7-1"];
    if (path === "/terms-conditions") return ["7-2"];
    if (path === "/privacy-policy") return ["7-3"];
    return ["1"];
  };

  const sidebarItems = [
    {
      key: "1",
      icon: <AppstoreOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: "2",
      icon: <FaUsers />,
      label: <Link to="/users">Users</Link>,
    },
    {
      key: "3",
      icon: <FaBuildingFlag />,
      label: <Link to="/flagged-content">Flagged Content</Link>,
    },

    {
      key: "4",
      icon: <MdOutlinePayment />,
      label: <Link to="/payouts">Payouts</Link>,
    },
    {
      key: "5",
      icon: <ContainerOutlined />,
      label: <Link to="/tasks">Tasks</Link>,
    },
    {
      key: "6",
      icon: <SlBadge />,
      label: <Link to="/leaderboard">Leaderboard</Link>,
    },
    {
      key: "administrators",
      icon: <MdOutlineAdminPanelSettings />,
      label: <Link to="/administrators">Administrators</Link>,
    },
    {
      key: "7",
      icon: <SettingOutlined />,
      label: "Settings",
      className: "custom-submenu ", // Add this
      popupClassName: "custom-submenu-popup bg-red-500", // Add this
      children: [
        {
          key: "7-1",
          label: <Link to="/profile">Profile</Link>,
        },
        {
          key: "7-2",
          label: <Link to="/terms-conditions">Terms & Conditions</Link>,
        },
        {
          key: "7-3",
          label: <Link to="/privacy-policy">Privacy Policy</Link>,
        },
      ],
    },
    // Add logout as a menu item at the bottom
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      className: "bottom-20",
      onClick: handleSignOut,
      style: {
        position: "absolute",
        width: "100%",
      },
      danger: true,
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={getSelectedKey()}
        items={sidebarItems}
        onClick={onClick}
        style={{
          height: "calc(100% - 64px)",
          backgroundColor: "#2E3F49",
          color: "#F3F3F3",
        }}
        theme="dark"
      />
    </div>
  );
};

export default Sidebar;
