import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button
      className={`border h-[42px] rounded-[5px] w-[148px] shadow-md hover:border-[#7765C4] hover:text-[#7765C4] flex items-center justify-center gap-x-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
  // }) => {
  //   return (
  //     <button className="border h-[42px] rounded-[5px] w-[148px] shadow-md hover:border-[#7765C4] hover:text-[#7765C4] flex items-center justify-center gap-x-2">
  //       Add{" "}
  //       <i
  //         className="pi
  // pi-plus-circle"
  //       ></i>
  //     </button>
  //   );
};

export default Button;
