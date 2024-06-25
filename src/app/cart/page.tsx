"use client";
import Button from "components/Button";
import Header from "components/Header";
import { useCart } from "../app-context";

const Cart = () => {
  const { state } = useCart();
  console.log(state.items);
  return (
    <div>
      <Header />
      <div className="p-4 flex gap-x-4">
        <div className="w-3/4 h-screen border"></div>
        <div className="w-1/4 h-fit p-2 rounded-[5px] border">
          <p className="p-5 font-bold text-2xl">Summary</p>

          <div className="w-full border-b"></div>

          <div className="px-5 py-4 flex flex-col gap-y-5">
            <p>Subtotal</p>
            <div className="flex items-center justify-between">
              {" "}
              <p>Items (6)</p> <p>$1,500.99</p>
            </div>

            <p>Delivery not include</p>

            <Button>Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
