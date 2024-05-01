"use client";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Divider, Radio } from "antd";
import { useEffect, useState } from "react";
import TasksModal from "../../../components/Pages/Tasks/TasksModal";
import TasksTable from "../../../components/Pages/Tasks/TasksTable";

const TasksPage = () => {
  const [isOpenTaskModal, setIsOpenTaskModal] = useState(false);
  const [tasksData, setTasksData] = useState([]);
  const [filterBy, setFilterBy] = useState("all");
  const useGetTasks = async () => {
    const response = await fetch("http://localhost:5000/tasks");
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

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Tasks</h1>
        <div className="flex items-center gap-4">
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
