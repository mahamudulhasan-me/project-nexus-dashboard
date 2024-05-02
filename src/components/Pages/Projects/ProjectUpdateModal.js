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

const ProjectUpdateModal = ({
  isOpenProjectModal,
  setIsOpenProjectModal,
  refetch,
  updatedInfo,
}) => {
  const [projectName, setProjectName] = useState("");
  const [deadLineDate, setDeadLine] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [descriptions, setDescription] = useState("");
  const [changeStatus, setChangeStatus] = useState("");
  const formRef = useRef(null);

  const { _id, name, deadline, team, description, status } = updatedInfo;

  useEffect(() => {
    setProjectName(name);
    setDeadLine(moment(deadline)); // Convert to moment object
    setTeamMembers(team);
    setDescription(description);
    setChangeStatus(status);
  }, [deadline, description, name, team, updatedInfo, status]);

  const handleUpdateProject = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your API endpoint
      const response = await fetch(
        `https://project-nexus-server-mu.vercel.app/projects/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: projectName,
            deadLine: deadLineDate,
            team: teamMembers,
            description: descriptions,
            status: changeStatus,
            updatedAt: new Date().toISOString(),
          }),
        }
      );
      if (response.ok) {
        // Data posted successfully
        refetch();
        setIsOpenProjectModal(false);
        toast.success("Project updated successfully");
      } else {
        // Handle error response
        console.error("Failed to update project data:", response.status);
      }
    } catch (error) {
      toast.error("Error updating project data:", error.message);
    }
  };

  return (
    <>
      <Modal
        title={"Update Project"}
        centered
        open={isOpenProjectModal} // Use visible instead of open
        onOk={handleUpdateProject}
        onCancel={() => setIsOpenProjectModal(false)}
        okText="Update"
      >
        <Divider />
        <form
          ref={formRef}
          className="space-y-4"
          onSubmit={handleUpdateProject}
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
              // Format the date using moment
              value={deadLineDate ? moment(deadLineDate) : null}
              onChange={(date, dateString) => setDeadLine(dateString)} // Use dateString instead of date object
            />
          </div>
          <div>
            <Select
              defaultValue={status}
              className="w-full"
              allowClear
              onChange={(value) => setChangeStatus(value)}
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
            <label htmlFor="deadLine">Description</label> <br />
            <Input.TextArea
              name="descriptions"
              value={descriptions}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ProjectUpdateModal;
