"use client";
import Button from "components/Button";
import Header from "components/Header";
import { useCart } from "../app-context";
import { useEffect } from "react";
import CartCard from "components/CartCard";

export default function Cart() {
  const { state, quantities, getTotalPrice } = useCart();
  useEffect(() => {
    console.log("Cart component mounted");
  }, []);
  return (
    <main className="flex lg:min-h-screen flex-col pb-12">
      <Header />
      <p className="px-8 py-4 text-2xl font-sans font-semibold">
        Shopping Cart
      </p>
      <div className="px-8 py-4 flex lg:gap-x-4 flex-col lg:flex-row gap-y-8">
        <div className="lg:w-[73%] flex flex-col gap-y-4 border rounded-[7px]">
          {state.items.map((item) => (
            <CartCard {...item} key={item.id} />
          ))}
        </div>
        <div className="lg:w-1/4 h-fit p-2 rounded-[5px] border lg:fixed top-40 right-5">
          <p className="p-5 font-bold text-2xl">Summary</p>

          <div className="w-full border-b"></div>

          <div className="px-5 py-4 flex flex-col gap-y-5">
            <p>Subtotal</p>
            <div className="flex items-center justify-between">
              {" "}
              <p>{`Items (${quantities})`}</p> <p>{`$${getTotalPrice()}`}</p>
            </div>

            <p>Delivery not include</p>

            <Button className="!bg-primary text-white border-none">
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
