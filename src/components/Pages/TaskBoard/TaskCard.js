import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Draggable } from "react-beautiful-dnd"; // Import Draggable

const TaskCard = ({ data, title }) => {
  return (
    <div className="bg-[#F5F5F5]  rounded-md">
      <div className="text-center  border-b border-gray-300 p-2 shadow-sm">
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
                className="p-2 bg-white cursor-move rounded-md border text-gray-600"
              >
                <p className="text-lg">{task.title}</p>
                <Avatar
                  size={24}
                  icon={<UserOutlined color="volcano" />}
                />{" "}
                {task.assignedTo}
              </div>
            )}
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
