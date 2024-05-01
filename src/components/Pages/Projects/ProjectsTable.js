import {
  DeleteOutlined,
  EditTwoTone,
  FundViewOutlined,
} from "@ant-design/icons";
import { Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import ProjectUpdateModal from "./ProjectUpdateModal";
import ProjectViewModal from "./ProjectViewModal";

const ProjectsTable = ({ data, refetch, isLoading }) => {
  const [isUpdate, setIsUpdated] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({});
  const [isOpenProjectModal, setIsOpenProjectModal] = useState(false);
  const [openProjectViewModal, setOpenProjectViewModal] = useState(false);

  const handleEditProject = (record) => {
    setIsOpenProjectModal(true);
    setUpdatedInfo(record);
    setIsUpdated(true);
  };
  const handleViewProject = (record) => {
    setUpdatedInfo(record);
    setOpenProjectViewModal(true);
  };
  const handleDeleteProject = async (projectId) => {
    try {
      const response = await fetch(
        `https://project-nexus-server-i51d4jnsr-mahamudulhasanmes-projects.vercel.app/projects/${projectId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        toast.success("Project deleted successfully");
        refetch();
      } else {
        toast.error("Failed to delete project");
      }
    } catch (error) {
      toast.error("Error deleting project:", error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
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
      title: "Teams",
      key: "team",
      dataIndex: "team",
      render: (_, { team }) => (
        <>
          {team?.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Assign Date",
      dataIndex: "createAt",
      key: "createAt",
      render: (_, { createAt }) => moment(createAt).format("MMM Do YY"),
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
              onClick={() => handleViewProject(record)}
              className="cursor-pointer"
            />
          </Tooltip>
          <Tooltip title="Edit Project" color="geekblue">
            <EditTwoTone
              onClick={() => handleEditProject(record)}
              className="cursor-pointer"
            />
          </Tooltip>
          <Tooltip title="Delete Project" color="red">
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => handleDeleteProject(record._id)}
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
    <>
      <div className="overflow-x-auto">
        {isOpenProjectModal && (
          <ProjectUpdateModal
            isOpenProjectModal={isOpenProjectModal}
            setIsOpenProjectModal={setIsOpenProjectModal}
            updatedInfo={updatedInfo}
            isUpdate={isUpdate}
            refetch={refetch}
          />
        )}
        <ProjectViewModal
          setOpenProjectViewModal={setOpenProjectViewModal}
          openProjectViewModal={openProjectViewModal}
          projectInfo={updatedInfo}
        />
        <Table columns={columns} dataSource={data} loading={isLoading} />
      </div>
    </>
  );
};

export default ProjectsTable;
