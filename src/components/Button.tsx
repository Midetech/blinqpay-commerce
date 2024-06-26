import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
  className?: string;
}
const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button
      className={`h-[42px] rounded-[5px] w-[148px] flex items-center justify-center gap-x-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
