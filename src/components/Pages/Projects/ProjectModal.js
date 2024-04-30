"use client";

import { Divider, Input, Modal, Select } from "antd";

const ProjectModal = ({ isOpenProjectModal, setIsOpenProjectModal }) => {
  const teamMembers = [
    { label: "John Doe", value: "John Doe" },
    { label: "Alice Johnson", value: "Alice Johnson" },
    { label: "Bob Smith", value: "Bob Smith" },
    { label: "Michael Jones", value: "Michael Jones" },
    { label: "Emma Brown", value: "Emma Brown" },
    { label: "David Wilson", value: "David Wilson" },
  ];

  return (
    <>
      <Modal
        title="Create New Project"
        centered
        open={isOpenProjectModal}
        // onOk={() => setModal2Open(false)}
        onCancel={() => setIsOpenProjectModal(false)}
        okText="Create"
      >
        <Divider />
        <form>
          <div>
            <label htmlFor="projectName">Project Name</label>
            <Input
              name="projectName"
              placeholder="Enter Project Name"
              required
            />
          </div>
          <div>
            <label htmlFor="teamMembers">Select Team Members</label>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              //   defaultValue={["a10", "c12"]}
              //   onChange={handleChange}
              options={teamMembers}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ProjectModal;
