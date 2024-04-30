"use client";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Divider, Input, Radio } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const SignIn = ({ setRegisterKey }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const authCredentials = {
    email: "admin@nexusProject.com",
    password: "123",
  };

  const handleSignIn = (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (
      authCredentials.email === e.target.email.value &&
      authCredentials.password === e.target.password.value
    ) {
      toast.success("Login Success");
      router.push("/dashboard");
    } else {
      toast.error("Login Failed");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="p-3 space-y-4 text-gray-600">
        <form action="" onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email">Email</label>
            <Input
              placeholder="Enter Email"
              name="email"
              type="email"
              value={"admin@nexusProject.com"}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input.Password
              placeholder="Enter Password"
              name="password"
              value={"123"}
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
          <Button
            type="primary"
            htmlType="submit"
            icon={<LoginOutlined />}
            block
            loading={isLoading}
          >
            Sign In
          </Button>
        </form>
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link
            href={""}
            className="text-blue-500"
            onClick={() => setRegisterKey("register")}
          >
            Free Register
          </Link>
        </p>
        <Divider plain>Or Sign In with</Divider>
        <Radio.Group className="w-full flex flex-row justify-between ">
          <Radio.Button value="google" className="w-full text-center">
            Google
          </Radio.Button>
          <Radio.Button value="facebook" className="w-full text-center">
            Facebook
          </Radio.Button>
          <Radio.Button value="twitter" className="w-full text-center">
            Twitter
          </Radio.Button>
        </Radio.Group>
      </div>
    </>
  );
};

export default SignIn;
