import { UserOutlined } from "@ant-design/icons";
import { Avatar, Tag } from "antd";
import { Draggable } from "react-beautiful-dnd"; // Import Draggable

const TaskCard = ({ data, title }) => {
  return (
    <div className="bg-[#F5F5F5]  rounded-md h-4/5 overflow-y-scroll">
      <div className="text-center  border-b border-gray-300 p-2 shadow-sm sticky top-0 bg-[#f5f5f5]">
        <h4 className="text-gray-600 font-semibold">
          {title}-{data?.length}
        </h4>
      </div>
      <div className="p-2 space-y-4 mt-2 w-full h-full overflow-hidden">
        {/* Wrap each task item with Draggable */}
        {data.map((task, index) => (
          <Draggable key={task._id} draggableId={task._id} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="p-2 bg-white rounded-md border text-gray-600"
              >
                <p className="text-lg">{task.title}</p>
                <div className="flex justify-between items-center">
                  <Tag color={task.priority === "High" ? "red" : "orange"}>
                    {task.priority}
                  </Tag>
                  <p className="text-sm">
                    <Avatar size={24} icon={<UserOutlined color="volcano" />} />{" "}
                    {task.assignedTo}
                  </p>
                </div>
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
