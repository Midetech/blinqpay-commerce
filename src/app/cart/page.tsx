"use client";
import Button from "components/Button";
import Header from "components/Header";
import { useCart } from "../app-context";
import { useEffect } from "react";
import CartCard from "components/CartCard";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { state, quantities, getTotalPrice } = useCart();
  const router = useRouter();
  return (
    <main className="flex lg:min-h-screen flex-col pb-12">
      <Header />
      <p className="px-8 py-4 text-2xl font-sans font-semibold">
        Shopping Cart
      </p>
      {state.items.length === 0 && (
        <div className="w-full flex flex-col justify-center items-center mt-44 gap-y-3">
          <p className="text-2xl font-semibold">Cart is Empty</p>
          <Button
            onClick={() => router.push("/")}
            className="w-[248px] text-white bg-primary"
          >
            Go to products page
          </Button>
        </div>
      )}
      {state.items.length > 0 && (
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
      )}
    </main>
  );
}
