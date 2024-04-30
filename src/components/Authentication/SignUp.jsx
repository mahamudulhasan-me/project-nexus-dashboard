import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoginOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Input, InputNumber } from "antd";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="p-3 space-y-4 text-gray-600">
      <div>
        <label htmlFor="userName">Username</label>
        <Input placeholder="Enter Username" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Input placeholder="Enter Email" type="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input.Password
          placeholder="Enter Password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <Input.Password
          placeholder="Enter Confirm Password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </div>
      <div>
        <label htmlFor="mobileNumber">Mobile Number</label> <br />
        <InputNumber placeholder="Enter Mobile Number" className="w-full" />
      </div>
      <Checkbox className="text-gray-500">
        You agree to the Nexus Dashboard
        <Link href={""} className="text-blue-500">
          {" "}
          Terms of Use
        </Link>
      </Checkbox>
      <Button type="primary" icon={<LoginOutlined />} block>
        Register
      </Button>
    </div>
  );
};

export default SignUp;
