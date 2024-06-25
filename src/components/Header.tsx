"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useCart } from "../app/app-context";
import Button from "./Button";

interface HeaderProps {
  isSearchEnable?: boolean;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Header = ({ handleSearch, isSearchEnable = false }: HeaderProps) => {
  const { quantities } = useCart();

  const router = useRouter();
  return (
    <div className="h-[80px] w-full border border-b flex items-center justify-between px-8 sticky top-0 bg-white overflow-hidden">
      <div onClick={() => router.push("/")}>
        <Image
          src="/blinqshop.png"
          width={80}
          height={100}
          alt="Bliq Shop"
          priority
        />
      </div>

      {isSearchEnable && (
        <div className="h-[40px] w-2/5 rounded-[8px] border">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search"
            className="w-full h-[38px] p-2 outline-none bg-transparent"
          />
        </div>
      )}
      <div onClick={() => router.push("/cart")} className="text-[#7765C4] pr-4">
        <i
          className="pi pi-shopping-cart text-2xl lg:text-3xl p-overlay-badge relative cursor-pointer
"
        >
          {quantities > 0 && (
            <div className="w-4 h-4 text-[10px] font-sans font-medium flex items-center justify-center rounded-full text-white  bg-[#7765C4] absolute -top-1 -right-2">
              {quantities}
            </div>
          )}
        </i>
      </div>
    </div>
  );
};

export default Header;
