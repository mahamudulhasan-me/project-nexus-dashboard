"use client";
import {
  BellOutlined,
  FundProjectionScreenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TableOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Avatar, Button, Divider, Layout, Menu } from "antd";
import Search from "antd/es/input/Search";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: "dashboard",
      icon: <TableOutlined />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      key: "projects",
      icon: <FundProjectionScreenOutlined />,
      label: "Projects",
      href: "/dashboard/projects",
    },
    {
      key: "tasks",
      icon: <UnorderedListOutlined />,
      label: "Tasks",
      href: "/dashboard/tasks",
    },
  ];

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="h-screen bg-slate-900 text-white fixed top-0 left-0 bottom-0"
      >
        <div className="demo-logo-vertical flex w-full justify-center items-center py-4">
          <Image src={"/images/logo.png"} width={30} height={30} alt="logo" />
        </div>
        <Divider />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]}>
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link href={item.href} className="text-white">
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: "#fff", paddingLeft: 16 }}
          className="flex justify-between items-center"
        >
          <div className="flex items-center gap-4">
            <Button
              type="text"
              className="w-10"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <Search
              placeholder="input search text"
              allowClear
              //   onSearch={onSearch}
              style={{ width: 300 }}
            />
          </div>
          <div className="flex items-center  justify-around ">
            <BellOutlined className="text-2xl" />
            <div className="px-4 flex items-center gap-1">
              <div className="flex flex-col -space-y-10">
                <p className="font-semibold">Mahamudul Hasan</p>
                <p>Admin</p>
              </div>
              <Avatar size={48} icon={<UserOutlined />} />
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#fff",
          }}
        >
          <QueryClientProvider client={new QueryClient()}>
            {children}
          </QueryClientProvider>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
