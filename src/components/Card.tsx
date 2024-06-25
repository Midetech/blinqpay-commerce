import Image from "next/image";
import React from "react";
import _ from "lodash";
import Button from "./Button";

interface CardProps {
  title: string;
  description: string;
  price: number;
  image: string;
}
const Card = ({ title, description, price, image }: CardProps) => {
  return (
    <div className="xl:w-[24%] lg:w-[23%]  border p-4 rounded-[8px] space-y-2 shadow-sm">
      <div className="h-44">
        <img
          src={image}
          alt={title}
          className="object-contain h-full w-full shrink-0"
        />
      </div>
      <h1 className="text-lg font-bold">
        {_.truncate(title, {
          length: 20,
        })}
      </h1>
      <p className="text-sm">
        {_.truncate(description, {
          length: 100,
        })}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold">${price}</p>

        <Button />
      </div>
    </div>
  );
};

export default Card;
