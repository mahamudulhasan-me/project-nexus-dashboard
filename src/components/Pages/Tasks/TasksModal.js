import { DatePicker, Divider, Input, Modal, Select } from "antd";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const TeamMembers = [
  { label: "John Doe", value: "John Doe" },
  { label: "Alice Johnson", value: "Alice Johnson" },
  { label: "Bob Smith", value: "Bob Smith" },
  { label: "Michael Jones", value: "Michael Jones" },
  { label: "Emma Brown", value: "Emma Brown" },
  { label: "David Wilson", value: "David Wilson" },
];
const TaskPriority = [
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

const TaskModal = ({
  isOpenTasksModal,
  setIsOpenTasksModal,
  isUpdate,
  refetch,
  updatedInfo,
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskAssignedTo, setTaskAssignTo] = useState();
  const [taskPriority, setTaskPriority] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadLine, setTaskDeadLine] = useState();
  const [taskStatus, setTaskStatus] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    if (isUpdate) {
      setTaskTitle(updatedInfo.title);
      setTaskAssignTo(updatedInfo.assignedTo);
      setTaskPriority(updatedInfo.priority);
      setTaskDescription(updatedInfo.description);
      setTaskDeadLine(new Date(updatedInfo?.deadline));
      setTaskStatus(updatedInfo.status);
    }
  }, [updatedInfo, isUpdate]);

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your API endpoint
      const response = await fetch("http://localhost:5000/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: taskTitle,
          deadline: taskDeadLine,
          assignedTo: taskAssignedTo,
          description: taskDescription,
          status: taskStatus,
          priority: taskPriority,
          createdAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        refetch();
        setIsOpenTasksModal(false);
        toast.success("Task created successfully");
      } else {
        // Handle error response
        console.error("Failed to post task data:", response.status);
      }
    } catch (error) {
      console.error("Error posting task data:", error);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your API endpoint
      const response = await fetch(
        `http://localhost:5000/task/${updatedInfo?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: taskTitle,
            deadline: taskDeadLine.toISOString(),
            assignedTo: taskAssignedTo,
            description: taskDescription,
            status: taskStatus,
            priority: taskPriority,
            updateAt: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        // Data posted successfully
        refetch();
        setIsOpenTasksModal(false);
        toast.success("Task updated successfully");
      } else {
        // Handle error response
        console.error("Failed to update task data:", response.status);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating task data:", error.message);
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      formRef.current.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  };

  return (
    <Modal
      title={isUpdate ? "Update Task" : "Create Task"}
      centered
      open={isOpenTasksModal} // Use visible instead of open
      onOk={isUpdate ? handleUpdateTask : handleCreateTask}
      onCancel={() => setIsOpenTasksModal(false)}
      okText={isUpdate ? "Update" : "Create"}
    >
      <Divider />
      <form
        ref={formRef}
        className="space-y-4"
        onSubmit={handleCreateTask}
        onKeyDown={handleEnterKeyPress}
      >
        <div>
          <label htmlFor="title">Title</label>
          <Input
            name="title"
            value={taskTitle}
            placeholder="Enter Task Title"
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="assignedTo">Assign To</label>
          <Select
            // mode="multiple"
            allowClear
            name="assignedTo"
            value={taskAssignedTo}
            style={{
              width: "100%",
            }}
            placeholder="Please select"
            onChange={(value) => setTaskAssignTo(value)}
            options={TeamMembers}
          />
        </div>
        <div>
          <label htmlFor="priority">Priority</label>
          <Select
            // mode="multiple"
            allowClear
            name="priority"
            value={taskPriority}
            style={{
              width: "100%",
            }}
            placeholder="Please select"
            onChange={(value) => setTaskPriority(value)}
            options={TaskPriority}
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <Select
            allowClear
            name="priority"
            value={taskStatus}
            style={{
              width: "100%",
            }}
            placeholder="Please select"
            onChange={(value) => setTaskStatus(value)}
            options={[
              {
                value: "In Progress",
                label: "In Progress",
              },
              {
                value: "Completed",
                label: "Completed",
              },
              {
                value: "Pending",
                label: "Pending",
              },
            ]}
          />
        </div>
        <div>
          <label htmlFor="deadLine">Dead Line</label> <br />
          <DatePicker
            className="w-full"
            name="deadLine"
            value={taskDeadLine ? moment(taskDeadLine) : null} // Format the date if not null
            onChange={(date) => setTaskDeadLine(date ? moment(date) : null)} // Convert to moment object
          />
        </div>
        <div>
          <label htmlFor="deadLine">Description</label> <br />
          <Input.TextArea
            name="description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
