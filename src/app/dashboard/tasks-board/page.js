"use client";
import { useQuery } from "@tanstack/react-query";
import { Divider } from "antd";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd"; // Import DragDropContext and Droppable
import TaskCard from "../../../components/Pages/TaskBoard/TaskCard";

const TasksBoard = () => {
  const [completeTasks, setCompleteTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);

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
      setCompleteTasks(data.filter((task) => task.status === "Completed"));
      setInProgressTasks(data.filter((task) => task.status === "In Progress"));
      setPendingTasks(data.filter((task) => task.status === "Pending"));
    }
  }, [data]);

  const onDragEnd = (result) => {
    // Handle drag and drop logic here
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Tasks Board</h1>
        </div>
        <Divider plain />

        <div className="grid grid-cols-3 gap-10 h-full">
          {/* Wrap TaskCard components inside Droppable */}
          <Droppable droppableId="pending">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <TaskCard data={pendingTasks} title={"Pending"} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="inProgress">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <TaskCard data={inProgressTasks} title={"In Progress"} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="complete">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <TaskCard data={completeTasks} title={"Completed"} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default TasksBoard;
