import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <div className="flex justify-center items-center w-full flex-col">
      <Image src={"/images/welcome.svg"} width={400} height={400} alt="logo" />
      <p className="text-gray-600">
        We are working hard to get this page ready as soon as possible.
      </p>
      <div className="space-x-3 mt-4">
        <Button>Home</Button>
        <Link href={"/dashboard/projects"}>
          <Button type="primary">Projects</Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
