/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import _ from "lodash";
import Button from "./Button";
import { useCart } from "../app/app-context";

interface CardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
}
const Card = (item: CardProps) => {
  const {
    state,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    addToCart,
  } = useCart();
  const existingItem = state.items.find((cart) => cart.id === item.id);
  return (
    <div className="xl:w-[24%] lg:w-[23%] md:w-[32%] w-[90%] border p-4 rounded-[8px] space-y-2 shadow-sm">
      <div className="h-44">
        <img
          src={item.image}
          alt={item.title}
          className="object-contain h-full w-full shrink-0"
        />
      </div>
      <h1 className="text-lg font-bold">
        {_.truncate(item.title, {
          length: 30,
        })}
      </h1>
      <p className="text-sm">
        {_.truncate(item.description, {
          length: 100,
        })}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold text-center">${item.price}</p>

        <div className="flex justify-between items-center gap-x-6 mt-4">
          {existingItem?.id === item.id && (
            <div className="flex items-center gap-x-2">
              <Button
                onClick={() => decreaseQuantity(item.id)}
                className="!bg-primary text-white !w-4 !h-4 !rounded-[3px] text-[10px]"
              >
                <i className=" pi pi-minus "></i>
              </Button>
              <p>{existingItem.quantity}</p>
              <Button
                onClick={() => increaseQuantity(item.id)}
                className="!bg-primary text-white !w-4 !h-4  !rounded-[3px]  text-[10px]"
              >
                <i className=" pi pi-plus"></i>
              </Button>
            </div>
          )}

          {existingItem?.id === item.id ? (
            <Button
              onClick={() => removeFromCart(item.id)}
              className="!w-8 !bg-transparent text-red-600"
            >
              <i className="pi pi-trash"></i>
            </Button>
          ) : (
            <Button
              className="hover:border-[#7765C4] hover:text-[#7765C4] border shadow-sm"
              onClick={() =>
                addToCart({
                  ...item,
                  quantity: 1,
                })
              }
            >
              Add
              <i
                className="pi
  pi-plus-circle"
              ></i>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
