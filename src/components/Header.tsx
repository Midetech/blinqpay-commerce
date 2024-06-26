"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useCart } from "../app/context/app-context";

interface HeaderProps {
  isSearchEnable?: boolean;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Header = ({ handleSearch, isSearchEnable = false }: HeaderProps) => {
  const { quantities } = useCart();

  const router = useRouter();
  return (
    <div className="h-[80px] w-full border border-b flex items-center justify-between px-8 sticky top-0 bg-white overflow-hidden z-50 shadow-md">
      <div onClick={() => router.push("/")}>
        <Image
          src="/blinqshop.png"
          width={100}
          height={100}
          alt="Bliq Shop"
          priority
          className="w-[80px]"
        />
      </div>

      {isSearchEnable && (
        <div className="h-[40px] w-2/5 rounded-[8px] border-[0.5px] flex items-center pl-2">
          <i className="pi pi-search"> </i>
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search"
            className="w-full h-[38px] p-2 outline-none  bg-transparent"
          />
        </div>
      )}

      <div className="flex items-center gap-x-10">
        <div className="border w-7 h-7 text-[#7765C4] rounded-full flex items-center justify-center border-[#7765C4] cursor-pointer">
          <i className="pi pi-user"></i>
        </div>
        <div onClick={() => router.push("/cart")} className="text-[#7765C4]">
          <i
            className="pi pi-shopping-cart text-2xl lg:text-2xl p-overlay-badge relative cursor-pointer
"
          >
            {quantities > 0 && (
              <div className="w-3 h-3 text-[9px] font-sans font-bold flex items-center justify-center rounded-full text-white  bg-[#7765C4] absolute -top-1 -right-2">
                {quantities}
              </div>
            )}
          </i>
        </div>
      </div>
    </div>
  );
};

export default Header;
