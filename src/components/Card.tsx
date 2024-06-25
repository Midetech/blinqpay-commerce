import Image from "next/image";
import React from "react";
import _ from "lodash";
import Button from "./Button";
import { useCart } from "../app/app-context";

interface CardProps {
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}
const Card = (item: CardProps) => {
  const {
    state,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getTotalPrice,
    addToCart,
  } = useCart();

  return (
    <div className="xl:w-[24%] lg:w-[23%]  border p-4 rounded-[8px] space-y-2 shadow-sm">
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
        <p className="text-sm font-bold">${item.price}</p>

        <Button
          onClick={() =>
            addToCart({
              ...item,
              quantity: 1,
            })
          }
        >
          {" "}
          Add{" "}
          <i
            className="pi
  pi-plus-circle"
          ></i>
        </Button>
      </div>
    </div>
  );
};

export default Card;
