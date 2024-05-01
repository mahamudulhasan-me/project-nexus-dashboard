"use client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Divider, Radio } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import TasksModal from "../../../components/Pages/Tasks/TasksModal";
import TasksTable from "../../../components/Pages/Tasks/TasksTable";

const TasksPage = () => {
  const [isOpenTaskModal, setIsOpenTaskModal] = useState(false);
  const [tasksData, setTasksData] = useState([]);
  const [filterBy, setFilterBy] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const useGetTasks = async () => {
    const response = await fetch(
      "https://project-nexus-server-i51d4jnsr-mahamudulhasanmes-projects.vercel.app/tasks"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: useGetTasks,
  });

  useEffect(() => {
    if (data) {
      if (filterBy === "all") {
        setTasksData(data);
      } else {
        setTasksData(data.filter((project) => project.status === filterBy));
      }
    }
  }, [data, filterBy]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const filtered = data?.filter((task) =>
        taskMatchesSearch(task, searchValue)
      );
      setTasksData(filtered);
    }, 300);
    return () => clearTimeout(delaySearch);
  }, [searchValue, data]);

  const taskMatchesSearch = (task, searchValue) => {
    const searchString = searchValue.toLowerCase();
    return (
      task.title.toLowerCase().includes(searchString) ||
      task.deadline.toLowerCase().includes(searchString) ||
      task?.assignedTo.toLowerCase().includes(searchString) ||
      task?.priority.toLowerCase().includes(searchString)
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between md:flex-row flex-col">
        <div className="flex items-center md:flex-row flex-col gap-2">
          <h1 className="text-3xl font-semibold">Tasks</h1>{" "}
          <Search
            placeholder="input search text"
            allowClear
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 250 }}
          />
        </div>
        <div className="flex items-center md:flex-row flex-col mt-3 md:mt-0 gap-4">
          {" "}
          <Button
            onClick={() => setIsOpenTaskModal(true)}
            type="primary"
            icon={<PlusCircleOutlined />}
            size={"middle"}
          >
            Create Task
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
      <TasksTable data={tasksData} refetch={refetch} isLoading={isLoading} />
      {isOpenTaskModal && (
        <TasksModal
          setIsOpenTasksModal={setIsOpenTaskModal}
          isOpenTasksModal={isOpenTaskModal}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default TasksPage;
