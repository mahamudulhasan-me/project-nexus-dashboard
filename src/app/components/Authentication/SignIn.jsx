import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Divider, Input, Radio } from "antd";
import Link from "next/link";
const SignIn = () => {
  return (
    <div className="p-3 space-y-4 text-gray-600">
      <div>
        <label htmlFor="email">Email</label>
        <Input placeholder="Enter Email" />
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
      <div className="flex items-center justify-between text-gray-500">
        <Checkbox className="text-gray-500">Remember me</Checkbox>
        <Link href={""} className="flex items-center gap-1">
          <LockOutlined />
          Forgot Password?
        </Link>
      </div>
      <Button type="primary" icon={<LoginOutlined />} block>
        Sign In
      </Button>
      <p className="text-center">
        Don&apos;t have an account?{" "}
        <Link href={""} className="text-blue-500">
          Free Register
        </Link>
      </p>
      <Divider plain>Or Sign In with</Divider>
      <Radio.Group className="w-full flex justify-between">
        <Radio.Button value="top" className="w-full text-center">
          Google
        </Radio.Button>
        <Radio.Button value="" className="w-full text-center">
          Facebook
        </Radio.Button>
        <Radio.Button value="" className="w-full text-center">
          Twitter
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default SignIn;
