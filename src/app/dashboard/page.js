import Image from "next/image";

const DashboardPage = () => {
  return (
    <div className="flex justify-center items-center w-full ">
      <Image src={"/images/welcome.svg"} width={400} height={400} alt="logo" />
    </div>
  );
};

export default DashboardPage;
