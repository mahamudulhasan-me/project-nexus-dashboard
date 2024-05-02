import { EllipsisOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Modal, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import moment from "moment";

const TaskViewModal = ({
  openTaskViewModal,
  setOpenTaskViewModal,
  taskInfo,
}) => {
  const { title, description, status, assignedTo, priority, deadline } =
    taskInfo;
  return (
    <Modal
      title=""
      centered
      open={openTaskViewModal}
      onCancel={() => setOpenTaskViewModal(false)}
      footer={
        <Button type="primary" onClick={() => setOpenTaskViewModal(false)}>
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
          <Tag
            key={"priority"}
            color={
              priority === "High"
                ? "red"
                : priority === "Medium"
                ? "orange"
                : "green"
            }
          >
            {priority}
          </Tag>,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="/images/task.png" />}
          title={title}
          description={description}
        />
        <div className="ml-10 mt-4 text-base text-gray-600">
          <p>Assign To: {assignedTo}</p>
          <p>Deadline: {moment(deadline).format("MMMM Do YYYY")}</p>
        </div>
      </Card>
    </Modal>
  );
};

export default TaskViewModal;
