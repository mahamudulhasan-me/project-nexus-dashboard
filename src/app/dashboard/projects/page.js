"use client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Divider, Radio } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import ProjectModal from "../../../components/Pages/Projects/ProjectModal";
import ProjectsTable from "../../../components/Pages/Projects/ProjectsTable";

const ProjectPage = () => {
  const [isOpenProjectModal, setIsOpenProjectModal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [filterBy, setFilterBy] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const useGetProjects = async () => {
    const response = await fetch(
      "https://project-nexus-server-i51d4jnsr-mahamudulhasanmes-projects.vercel.app/projects"
    );
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

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const filtered = data?.filter((project) =>
        projectMatchesSearch(project, searchValue)
      );
      setFilteredData(filtered);
    }, 300); // Adjust the delay time as needed

    return () => clearTimeout(delaySearch);
  }, [searchValue, data]);

  const projectMatchesSearch = (project, searchValue) => {
    const searchString = searchValue.toLowerCase();
    return (
      project.name.toLowerCase().includes(searchString) ||
      project.deadline.toLowerCase().includes(searchString) ||
      project.team.some((member) => member.toLowerCase().includes(searchString))
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between md:flex-row flex-col ">
        <div className="flex items-center md:flex-row flex-col  gap-2">
          <h1 className="text-3xl font-semibold">Projects</h1>{" "}
          <Search
            placeholder="input search text"
            allowClear
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 250 }}
          />
          {/* <input
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 250 }}
          /> */}
        </div>

        <div className="flex items-center md:flex-row flex-col gap-4 mt-3 md:mt-0">
          <Button
            onClick={() => setIsOpenProjectModal(true)}
            type="primary"
            icon={<PlusCircleOutlined />}
            size="middle"
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
