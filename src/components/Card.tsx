/* eslint-disable @next/next/no-img-element */
import _ from "lodash";
import { useRouter } from "next/navigation";
import { Rating } from "primereact/rating";
import { Product } from "../interfaces/interface";
import Button from "./Button";
import Image from "next/image";
import { useCart } from "../app/context/app-context";
import { Toast } from "primereact/toast";
import { useRef } from "react";
const Card = (item: Product) => {
  const toast = useRef<Toast>(null);
  const {
    state,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    addToCart,
    setProduct,
  } = useCart();
  const existingItem = state.items.find((cart: any) => cart.id === item.id);
  const router = useRouter();
  return (
    <div
      onClick={() => {
        setProduct(item);
        router.push("?modal=true");
      }}
      className="xl:w-[24%] lg:w-[23%] md:w-[32%] w-[90%] border p-4 rounded-[8px] space-y-2 shadow-sm cursor-pointer"
    >
      <Toast ref={toast} />
      <div className="h-44">
        <Image
          priority
          height={100}
          width={100}
          src={item.images[0]}
          alt={item.title}
          className="object-contain w-full h-full shrink-0"
        />
      </div>

      <h1 className="text-lg font-bold text-gray-700">
        {_.truncate(item.title, {
          length: 25,
        })}
      </h1>

      <p className="text-sm text-gray-600">
        {_.truncate(item.description, {
          length: 100,
        })}
      </p>

      <Rating
        className="text-primary"
        value={item.rating}
        disabled
        cancel={false}
      />
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold text-center">${item.price}</p>

        <div className="flex justify-between items-center gap-x-6 mt-4">
          {existingItem?.id === item.id && (
            <div className="flex items-center gap-x-2">
              <Button
                onClick={(e: { stopPropagation: () => void }) => {
                  e.stopPropagation();
                  decreaseQuantity(item.id);
                }}
                className="!bg-primary text-white !w-4 !h-4 !rounded-[3px] text-[10px]"
              >
                <i className=" pi pi-minus "></i>
              </Button>
              <p>{existingItem?.quantity}</p>
              <Button
                onClick={(e: { stopPropagation: () => void }) => {
                  e.stopPropagation();
                  increaseQuantity(item.id);
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
                removeFromCart(item.id);
                toast.current?.show({
                  severity: "info",
                  summary: "Cart updated",
                  detail: `${item.title} removed from cart`,
                  life: 3000,
                });
              }}
              className="!w-8 !bg-transparent text-red-600"
            >
              <i className="pi pi-trash"></i>
            </Button>
          ) : (
            <Button
              className="bg-[#7765C4] text-white shadow-sm"
              onClick={(e: { stopPropagation: () => void }) => {
                e.stopPropagation();
                addToCart({
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
