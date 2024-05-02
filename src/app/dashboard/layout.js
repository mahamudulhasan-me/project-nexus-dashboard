"use client";
import {
  BellOutlined,
  CodepenOutlined,
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
import { useEffect, useState } from "react";

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
    {
      key: "taskBoard",
      icon: <CodepenOutlined />,
      label: "Task Board",
      href: "/dashboard/tasks-board",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768; // Adjust the mobile size threshold as needed
      setCollapsed(isMobile);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize collapsed state on component mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="h-screen w-full bg-slate-900 text-white sticky top-0 left-0 bottom-0"
      >
        <div className="demo-logo-vertical flex w-full justify-center items-center py-4">
          <Image src={"/images/logo.png"} width={30} height={30} alt="logo" />
        </div>
        <Divider />
        <Menu theme="dark" mode="inline">
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link href={item.href} className="text-white">
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="h-screen overflow-y-scroll">
        <Header
          style={{ padding: 0, background: "#fff", paddingLeft: 16 }}
          className="flex justify-between items-center sticky top-0 z-50 shadow-md"
        >
          <div className="flex items-center gap-4">
            <Button
              type="text"
              className="w-10"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <Search
              placeholder="search"
              allowClear
              //   onSearch={onSearch}
              className="w-[300px] hidden md:block"
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
            background: "#fff",
          }}
          className="min-h-fit"
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
