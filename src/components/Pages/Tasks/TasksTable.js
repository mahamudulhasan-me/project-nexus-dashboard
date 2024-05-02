import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  EditTwoTone,
  FundViewOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import { Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import TaskViewModal from "./TaskViewModal";
import TasksModal from "./TasksModal";

const TasksTable = ({ data, refetch, isLoading }) => {
  const [isUpdate, setIsUpdated] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({});
  const [isOpenTaskModal, setIsOpenTaskModal] = useState(false);
  const [openTaskViewModal, setOpenTaskViewModal] = useState(false);

  const handleEditTask = (record) => {
    setIsOpenTaskModal(true);
    setUpdatedInfo(record);
    setIsUpdated(true);
  };
  const handleViewTAsk = (record) => {
    setUpdatedInfo(record);
    setOpenTaskViewModal(true);
  };
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `https://project-nexus-server-mu.vercel.app/task/${taskId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Task deleted successfully");
        refetch();
      } else {
        toast.error("Failed to delete task");
      }
    } catch (error) {
      toast.error("Error deleting task:", error.message);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (_, { priority }) => {
        let color = "";
        let icon = null;

        if (priority === "High") {
          color = "red";
          icon = <ArrowUpOutlined />;
        } else if (priority === "Medium") {
          color = "orange";
          icon = <VerticalAlignTopOutlined />;
        } else {
          color = "green";
          icon = <ArrowDownOutlined />;
        }

        return (
          <Tag color={color} className="text-[14px]">
            {priority} {icon}
          </Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => {
        let color = "#faad14";
        status === "In Progress"
          ? (color = "#1890ff")
          : status === "Completed" && (color = "#52c41a");
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Dead Line",
      dataIndex: "deadline",
      key: "deadline",
      render: (_, { deadline }) => moment(deadline).format("MMM Do YY"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="text-xl">
          <Tooltip title="View Project">
            <FundViewOutlined
              onClick={() => handleViewTAsk(record)}
              className="cursor-pointer"
            />
          </Tooltip>
          <Tooltip title="Edit Project" color="geekblue">
            <EditTwoTone
              onClick={() => handleEditTask(record)}
              className="cursor-pointer"
            />
          </Tooltip>
          <Tooltip title="Delete Project" color="red">
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => handleDeleteTask(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined className="text-rose-600 cursor-pointer" />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      {" "}
      {/* Add horizontal scrolling */}
      <Table columns={columns} dataSource={data} loading={isLoading} />
      <TasksModal
        isUpdate={isUpdate}
        refetch={refetch}
        updatedInfo={updatedInfo}
        isOpenTasksModal={isOpenTaskModal}
        setIsOpenTasksModal={setIsOpenTaskModal}
      />
      <TaskViewModal
        openTaskViewModal={openTaskViewModal}
        setOpenTaskViewModal={setOpenTaskViewModal}
        taskInfo={updatedInfo}
      />
    </div>
  );
};

export default TasksTable;
