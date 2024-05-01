import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Modal, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import moment from "moment";

const ProjectViewModal = ({
  openProjectViewModal,
  setOpenProjectViewModal,
  projectInfo,
}) => {
  console.log(projectInfo);
  const { _id, name, deadline, team, description, status } = projectInfo;
  console.log(team);
  return (
    <Modal
      title=""
      centered
      open={openProjectViewModal}
      onCancel={() => setOpenProjectViewModal(false)}
      footer={
        <Button type="primary" onClick={() => setOpenProjectViewModal(false)}>
          Close
        </Button>
      }
    >
      <Card
        actions={[
          <Tag
            key={"status"}
            color={
              status === "In Progress"
                ? "blue"
                : status === "Completed"
                ? "green"
                : "red"
            }
          >
            {status}
          </Tag>,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="/images/project.png" />}
          title={name}
          description={description}
        />
        <div className="ml-10 mt-4 text-base text-gray-600">
          <p>Deadline: {moment(deadline).format("MMMM Do YYYY")}</p>
          <p>
            Team: {team?.map((member, index) => (index ? ", " : "") + member)}
          </p>
        </div>
      </Card>
    </Modal>
  );
};

export default ProjectViewModal;
