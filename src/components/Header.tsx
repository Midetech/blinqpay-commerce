import React from "react";

const Header = () => {
  return (
    <div className="h-[80px] w-full border border-b flex items-center justify-between px-4">
      <div className="h-14 w-44 rounded-full bg-black"></div>
      <i
        className="pi pi-shopping-cart text-4xl p-overlay-badge relative cursor-pointer
"
      >
        <div className="w-4 h-4 text-sm text-center font-semibold flex items-center justify-center rounded-full text-white  bg-slate-600 absolute -top-1 -right-2">
          2
        </div>
      </i>
    </div>
  );
};

export default Header;
