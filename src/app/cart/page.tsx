"use client";
import Button from "components/Button";
import CartCard from "components/CartCard";
import Header from "components/Header";
import { useRouter } from "next/navigation";
import { usePaystackPayment } from "react-paystack";
import { useCart } from "../context/app-context";
import { Key } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  clearCart,
  quantities,
  selectCartItems,
  selectTotalPrice,
} from "../redux/cart/cartSlice";
import Footer from "components/Footer";
export default function Cart() {
  const items = useSelector((state: RootState) => selectCartItems(state));
  const totalPrice = useSelector((state: RootState) => selectTotalPrice(state));
  const totalItems = useSelector((state: RootState) => quantities(state));
  const router = useRouter();
  const dispatch = useDispatch();
  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com",
    amount: Number(totalPrice.toFixed(2)) * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: `${process.env.NEXT_PUBLIC_PAYSTACK_KEY}`,
  };

  // you can call this function anything
  const onSuccess = (reference: any) => {
    // Implementation for whatever you want to do with reference and after success call.
    localStorage.clear();
    dispatch(clearCart());
    router.push("/");
    console.log(reference);
  };

  // you can call this function anything
  const onClose = (err: any) => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const initializePayment = usePaystackPayment(config);
  return (
    <main className="flex lg:min-h-screen md:min-h-screen flex-col">
      <Header />
      <p className="px-8 py-4 text-2xl font-sans font-semibold">
        Shopping Cart
      </p>
      {items.length === 0 && (
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
      {items.length > 0 && (
        <div className="px-8 py-4 flex lg:gap-x-4 flex-col lg:flex-row gap-y-8 mb-16">
          <div className="lg:w-[73%] flex flex-col gap-y-4 border rounded-[7px]">
            {items.map((product, index: Key | null | undefined) => (
              <CartCard {...product} key={index} />
            ))}
          </div>

          <div className="lg:w-1/4 h-fit p-2 rounded-[5px] border lg:fixed top-40 right-5">
            <p className="p-5 font-bold text-2xl">Summary</p>

            <div className="w-full border-b"></div>

            <div className="px-5 py-4 flex flex-col gap-y-5">
              <p>Subtotal</p>
              <div className="flex items-center justify-between">
                {" "}
                <p>{`Items (${totalItems})`}</p>{" "}
                <p>{`$${totalPrice.toFixed(2)}`}</p>
              </div>

              <p>Delivery not include</p>

              <Button
                onClick={() => {
                  initializePayment({ onSuccess, onClose });
                }}
                className="!bg-primary text-white border-none"
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
}
