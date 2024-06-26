"use client";
import { Tabs } from "antd";
import Image from "next/image";
import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthenticationPage = () => {
  const [signInKey, setSignInKey] = useState("signIn");
  const [registerKey, setRegisterKey] = useState("register");

  const items = [
    {
      key: signInKey,
      label: "Sign In",
      children: <SignIn setRegisterKey={setRegisterKey} />,
    },
    {
      key: registerKey,
      label: "Register",
      children: <SignUp />,
    },
  ];

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[url('/images/authBg.png')] bg-cover bg-center bg-slate-200 bg-opacity-40 bg-blend-overlay">
      <div className="md:w-1/4 w-full border border-gray-200 bg-white">
        <div className="w-full flex flex-col justify-center items-center bg-slate-900 py-4">
          <Image src={"/images/logo.png"} width={40} height={40} alt="logo" />
          <h4 className="text-xl text-white">
            Let&apos;s Get Started Project Nexus
          </h4>
          <h6 className="text-gray-100 text-xs">
            Sign In to continue to Nexus Dashboard
          </h6>
        </div>
        <Tabs defaultActiveKey="signIn" items={items} className="px-1" />
        <p className="text-center text-gray-500 text-xs mt-3 mb-2">
          &copy;2024 Project Nexus
        </p>
      </div>
    </div>
  );
};

export default AuthenticationPage;
