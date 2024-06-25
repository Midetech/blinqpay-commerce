/* eslint-disable @next/next/no-img-element */

import _ from "lodash";
import Button from "./Button";
import { useCart } from "../app/app-context";
interface CartItem {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
  quantity: number;
}

const CartCard = (item: CartItem) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  return (
    <div className="w-full border-b flex p-4 gap-x-6">
      <div className="h-44 w-1/4">
        <img
          src={item.image}
          alt={item.title}
          className="object-contain h-full w-full shrink-0"
        />
      </div>
      <div className="w-3/4 flex flex-col justify-between">
        <div>
          <h1 className="text-lg font-bold">
            {_.truncate(item.title, {
              length: 30,
            })}
          </h1>
          <p className="text-sm">{item.description}</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-x-2">
            <Button
              onClick={() => decreaseQuantity(item.id)}
              className="!bg-primary text-white !w-4 !h-4 !rounded-[3px] text-[10px]"
            >
              <i className=" pi pi-minus "></i>
            </Button>
            <p>{item?.quantity}</p>
            <Button
              onClick={() => increaseQuantity(item.id)}
              className="!bg-primary text-white !w-4 !h-4  !rounded-[3px]  text-[10px]"
            >
              <i className=" pi pi-plus"></i>
            </Button>
          </div>

          <Button
            onClick={() => removeFromCart(item.id)}
            className="!w-28 !bg-red-600 !text-white"
          >
            <i className="pi pi-trash"></i>Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
