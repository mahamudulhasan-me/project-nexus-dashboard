"use client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Divider, Radio } from "antd";
import { useState } from "react";
import ProjectModal from "../../../components/Pages/Projects/ProjectModal";
import ProjectsTable from "../../../components/Pages/Projects/ProjectsTable";

const ProjectPage = () => {
  const [isOpenProjectModal, setIsOpenProjectModal] = useState(false);
  const useGetProjects = async () => {
    const response = await fetch("http://localhost:5000/projects");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: useGetProjects,
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <div className="flex items-center gap-4">
          {" "}
          <Button
            onClick={() => setIsOpenProjectModal(true)}
            type="primary"
            icon={<PlusCircleOutlined />}
            size={"middle"}
          >
            Create Project
          </Button>
          <Radio.Group value={"all"} size="middle" itemSelectedColor="red">
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="started">Started</Radio.Button>
            <Radio.Button value="inProgress">In Progress</Radio.Button>
            <Radio.Button value="completed">Completed</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <Divider plain />
      <ProjectsTable data={data} />
      {isOpenProjectModal && (
        <ProjectModal
          setIsOpenProjectModal={setIsOpenProjectModal}
          isOpenProjectModal={isOpenProjectModal}
        />
      )}
    </div>
  );
};

export default ProjectPage;
