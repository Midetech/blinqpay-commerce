/* eslint-disable @next/next/no-img-element */
import _ from "lodash";
import Image from "next/image";
import { Rating } from "primereact/rating";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
} from "../app/redux/cart/cartSlice";
import { RootState } from "../app/redux/store";
import { Product } from "../interfaces/interface";
import Button from "./Button";
interface CartItem extends Product {
  quantity: number;
}
const Card = ({
  item,
  setSelectedProduct,
}: {
  item: Product;
  setSelectedProduct: (item: Product) => void;
}) => {
  const toast = useRef<Toast>(null);
  const dispatch = useDispatch();
  const handleAddToCart = (product: CartItem) => {
    dispatch(addToCart(product));
  };
  const items = useSelector((state: RootState) => selectCartItems(state));
  const existingItem = items.find((cart: any) => cart.id === item.id);
  return (
    <div
      className="xl:w-[24%] lg:w-[23%] md:w-[32%] w-[45%] border p-4 rounded-[8px] space-y-2 shadow-sm cursor-pointer overflow-hidden"
      onClick={() => setSelectedProduct(item)}
    >
      <Toast ref={toast} />
      <div className="lg:h-44 h-20">
        <Image
          priority
          height={100}
          width={100}
          src={item.images[0]}
          alt={item.title}
          className="object-contain w-full h-full shrink-0"
        />
      </div>

      <p className="lg:text-lg hidden lg:block lg:font-bold text-gray-700">
        {_.truncate(item.title, {
          length: 25,
        })}
      </p>

      <p className="lg:hidden block text-sm lg:font-bold text-gray-700">
        {_.truncate(item.title, {
          length: 15,
        })}
      </p>

      <p className="text-sm text-gray-600 hidden lg:block">
        {_.truncate(item.description, {
          length: 100,
        })}
      </p>

      <Rating
        className="text-primary text-sm"
        size={2}
        value={item.rating}
        disabled
        cancel={false}
      />
      <div className="flex justify-between flex-col lg:flex-row  lg:items-center">
        <p className="text-sm font-bold lg:text-center">${item.price}</p>

        <div className="flex justify-between items-center gap-x-6 mt-4">
          {existingItem?.id === item.id && (
            <div className="flex items-center gap-x-2 h-[42px]">
              <Button
                onClick={(e: { stopPropagation: () => void }) => {
                  e.stopPropagation();
                  dispatch(decreaseQuantity(item.id));
                }}
                className="!bg-primary text-white !w-4 !h-4  !rounded-[3px] text-[10px]"
              >
                <i className=" pi pi-minus "></i>
              </Button>
              <p>{existingItem?.quantity}</p>
              <Button
                onClick={(e: { stopPropagation: () => void }) => {
                  e.stopPropagation();
                  dispatch(increaseQuantity({ id: item.id }));
                }}
                className="!bg-primary text-white !w-4 !h-4  !rounded-[3px]  text-[10px]"
              >
                <i className=" pi pi-plus"></i>
              </Button>
            </div>
          )}

          {existingItem?.id === item.id ? (
            <Button
              onClick={(e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                dispatch(removeFromCart({ id: item.id }));
                toast.current?.show({
                  severity: "info",
                  summary: "Cart updated",
                  detail: `${item.title} removed from cart`,
                  life: 3000,
                });
              }}
              className="!w-8 !h-6  !bg-transparent text-red-600"
            >
              <i className="pi pi-trash"></i>
            </Button>
          ) : (
            <Button
              className="bg-[#7765C4] text-white shadow-sm"
              onClick={(e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                handleAddToCart({
                  ...item,
                  quantity: 1,
                });
                toast.current?.show({
                  severity: "success",
                  summary: "Cart updated",
                  detail: `${item.title} added to cart`,
                  life: 3000,
                });
              }}
            >
              <i
                className="pi
          pi-shopping-cart"
              ></i>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
