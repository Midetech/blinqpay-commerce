"use client";
import Button from "components/Button";
import CartCard from "components/CartCard";
import Header from "components/Header";
import { useRouter } from "next/navigation";
import { useCart } from "../app-context";
import { usePaystackPayment } from "react-paystack";

export default function Cart() {
  const { state, quantities, getTotalPrice } = useCart();
  const router = useRouter();
  const config = {
    reference: new Date().getTime().toString(),
    email: "user@example.com",
    amount: getTotalPrice() * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: `${process.env.NEXT_PUBLIC_PAYSTACK_KEY}`,
  };

  // you can call this function anything
  const onSuccess = (reference: any) => {
    // Implementation for whatever you want to do with reference and after success call.
    localStorage.clear();
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
    </main>
  );
}
