import {
  DeleteOutlined,
  EditTwoTone,
  FundViewOutlined,
} from "@ant-design/icons";
import { Space, Table, Tag, Tooltip } from "antd";
import moment from "moment";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (_, { status }) => {
      let color = "#faad14";
      status === "In Progress"
        ? (color = "#1890ff")
        : status === "Completed" && (color = "#52c41a");
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Teams",
    key: "team",
    dataIndex: "team",
    render: (_, { team }) => (
      <>
        {team.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Assign Date",
    dataIndex: "createAt",
    key: "createAt",
    render: (_, { createAt }) => moment(createAt).format("MMM Do YY"),
  },
  {
    title: "Dead Line",
    dataIndex: "deadline",
    key: "deadline",
    render: (_, { deadline }) => moment(deadline).format("MMM Do YY"),
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle" className="text-xl">
        <Tooltip title="View Project">
          <FundViewOutlined className="cursor-pointer" />
        </Tooltip>
        <Tooltip title="Edit Project" color="geekblue">
          <EditTwoTone className="cursor-pointer" />
        </Tooltip>
        <Tooltip title="Delete Project" color="red">
          <DeleteOutlined className="text-rose-600 cursor-pointer" />
        </Tooltip>
      </Space>
    ),
  },
];
// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sydney No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];
const ProjectsTable = ({ data }) => (
  <Table columns={columns} dataSource={data} />
);
export default ProjectsTable;
