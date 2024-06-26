import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="h-12 w-full  px-8 flex items-center justify-between border-t  py-8">
      <Image
        src={"/blinqshop.png"}
        alt="Blinq Shop"
        width={100}
        height={100}
        className="w-[80px] h-[40px]"
        priority
      />

      <p className="text-sm text-gray-700">
        Copyright &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
