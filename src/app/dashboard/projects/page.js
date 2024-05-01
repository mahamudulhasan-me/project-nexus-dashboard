"use client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Divider, Radio } from "antd";
import { useEffect, useState } from "react";
import ProjectModal from "../../../components/Pages/Projects/ProjectModal";
import ProjectsTable from "../../../components/Pages/Projects/ProjectsTable";

const ProjectPage = () => {
  const [isOpenProjectModal, setIsOpenProjectModal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filterBy, setFilterBy] = useState("all");
  const useGetProjects = async () => {
    const response = await fetch("http://localhost:5000/projects");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: useGetProjects,
  });

  useEffect(() => {
    if (data) {
      if (filterBy === "all") {
        setFilteredData(data);
      } else {
        setFilteredData(data.filter((project) => project.status === filterBy));
      }
    }
  }, [data, filterBy]);

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
          <Radio.Group
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            size="middle"
            itemSelectedColor="red"
          >
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="Completed">Completed</Radio.Button>
            <Radio.Button value="In Progress">In Progress</Radio.Button>
            <Radio.Button value="Pending">Pending</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <Divider plain />
      <ProjectsTable
        data={filteredData}
        refetch={refetch}
        isLoading={isLoading}
      />
      {isOpenProjectModal && (
        <ProjectModal
          setIsOpenProjectModal={setIsOpenProjectModal}
          isOpenProjectModal={isOpenProjectModal}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ProjectPage;
