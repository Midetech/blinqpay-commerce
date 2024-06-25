import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useCart } from "../app/app-context";

interface HeaderProps {
  isSearchEnable?: boolean;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Header = ({ handleSearch, isSearchEnable = false }: HeaderProps) => {
  const { quantities } = useCart();

  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="lg:h-[80px] h-[50px] w-full border border-b flex items-center justify-between px-4"
    >
      <Image
        src="/blinqshop.png"
        width={80}
        height={100}
        alt="Bliq Shop"
        priority
      />

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
      <div onClick={() => router.push("/cart")} className="text-[#7765C4]">
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
