import { DatePicker, Divider, Input, Modal, Select } from "antd";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const TeamMembers = [
  { label: "John Doe", value: "John Doe" },
  { label: "Alice Johnson", value: "Alice Johnson" },
  { label: "Bob Smith", value: "Bob Smith" },
  { label: "Michael Jones", value: "Michael Jones" },
  { label: "Emma Brown", value: "Emma Brown" },
  { label: "David Wilson", value: "David Wilson" },
];

const ProjectModal = ({
  isOpenProjectModal,
  setIsOpenProjectModal,
  isUpdate,
  refetch,
}) => {
  const [projectName, setProjectName] = useState("");
  const [deadLine, setDeadLine] = useState();
  const [teamMembers, setTeamMembers] = useState([]);
  const [description, setDescription] = useState("");
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your API endpoint
      const response = await fetch("http://localhost:5000/projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: projectName,
          deadLine: deadLine,
          team: teamMembers,
          description: description,
          status: "In Progress",
          createdAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // Data posted successfully
        refetch();
        setIsOpenProjectModal(false);
        toast.success("Project created successfully");
      } else {
        // Handle error response
        console.error("Failed to post project data:", response.status);
      }
    } catch (error) {
      console.error("Error posting project data:", error);
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
      title={"Create erer Project"}
      centered
      open={isOpenProjectModal} // Use visible instead of open
      onOk={handleCreateProject}
      onCancel={() => setIsOpenProjectModal(false)}
      okText="Create"
    >
      <Divider />
      <form
        ref={formRef}
        className="space-y-4"
        onSubmit={handleCreateProject}
        onKeyDown={handleEnterKeyPress}
      >
        <div>
          <label htmlFor="projectName">Project Name</label>
          <Input
            name="projectName"
            value={projectName}
            placeholder="Enter Project Name"
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="teamMembers">Select Team Members</label>
          <Select
            mode="multiple"
            allowClear
            name="teamMembers"
            value={teamMembers}
            style={{
              width: "100%",
            }}
            placeholder="Please select"
            onChange={(value) => setTeamMembers(value)}
            options={TeamMembers}
          />
        </div>
        <div>
          <label htmlFor="deadLine">Dead Line</label> <br />
          <DatePicker
            className="w-full"
            name="deadLine"
            value={deadLine}
            onChange={(date) => setDeadLine(date)}
          />
        </div>
        <div>
          <label htmlFor="deadLine">Description</label> <br />
          <Input.TextArea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ProjectModal;
