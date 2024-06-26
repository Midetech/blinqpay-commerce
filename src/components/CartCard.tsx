/* eslint-disable @next/next/no-img-element */

import _ from "lodash";
import Button from "./Button";
import Image from "next/image";
import { Product } from "../interfaces/interface";
import React from "react";
import { Rating } from "primereact/rating";
import { useCart } from "../app/context/app-context";
interface Cartproduct extends Product {
  quantity: number;
}

const CartCard = (product: Cartproduct) => {
  const [activeImage, setActiveImage] = React.useState(product.images[0]);

  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  return (
    <div className="w-full border-b flex flex-col py-4 gap-x-6">
      <div className="w-full flex p-4 gap-x-6">
        <div className="w-1/4 flex flex-col">
          <Image
            height={100}
            width={100}
            src={activeImage}
            alt={product.title}
            className="object-contain h-[182px] w-full shrink-0 "
          />
        </div>
        <div className="w-3/4 flex flex-col justify-between">
          <div className="space-y-2">
            <h1 className="text-lg font-bold text-gray-700">{product.title}</h1>
            <p className="lg:text-sm text-[12px] text-gray-600">
              {product.description}
            </p>
            <div className="bg-yellow-300  h-8 w-fit rounded-[10px] flex items-center justify-center px-2">
              <p className="text-yellow-600 text-sm font-bold font-sans ">
                {product.sku}
              </p>
            </div>

            <div className="flex justify-between products-center">
              <Rating
                className="text-primary"
                value={product.rating}
                disabled
                cancel={false}
              />
              <p>{product.reviews.length} Reviews</p>
            </div>
          </div>

          <div className="flex justify-between products-center mt-4">
            <div className="flex products-center gap-x-2">
              <Button
                onClick={() => decreaseQuantity(product.id)}
                className="!bg-primary text-white !w-4 !h-4 !rounded-[3px] text-[10px]"
              >
                <i className=" pi pi-minus "></i>
              </Button>
              <p>{product?.quantity}</p>
              <Button
                onClick={() => increaseQuantity(product.id)}
                className="!bg-primary text-white !w-4 !h-4  !rounded-[3px]  text-[9px] p-2"
              >
                <i className=" pi pi-plus"></i>
              </Button>
            </div>

            <Button
              onClick={() => removeFromCart(product.id)}
              className="!w-28 !bg-red-600 !text-white"
            >
              <i className="pi pi-trash"></i>Remove
            </Button>
          </div>
        </div>
      </div>
      <div className="flex">
        {product.images.map((image, index) => (
          <div onClick={() => setActiveImage(image)} key={index}>
            <Image
              height={100}
              width={100}
              src={image}
              quality={100}
              alt={product.title}
              className="object-contain h-[100px] w-[100px] shrink-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartCard;
