"use client";
import Image from "next/image";
import { Rating } from "primereact/rating";
import React from "react";
import { useCart } from "../app/context/app-context";
import { Product } from "../interfaces/interface";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/redux/store";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
} from "../app/redux/cart/cartSlice";

function Modal({
  product,
  setSelectedProduct,
}: {
  product: Product;
  setSelectedProduct: (item: Product) => void;
}) {
  const items = useSelector((state: RootState) => selectCartItems(state));
  const existingItem = items.find((cart: any) => cart.id === product?.id);
  const dispatch = useDispatch();
  const [activeImage, setActiveImage] = React.useState("");

  React.useEffect(() => {
    if (product?.id) {
      setActiveImage(product.images[0]);
    }
  }, [product?.id, product?.images]);

  return (
    <>
      {product?.id && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-white w-[750px] m-auto p-4 rounded-[8px]">
            <div>
              <div className="flex items-center justify-between border-b pb-2">
                <p className="font-bold text-base">Product Details</p>

                <Button
                  className="w-6"
                  onClick={() => setSelectedProduct({} as any)}
                >
                  <i
                    className="pi 
pi-times-circle"
                  ></i>{" "}
                </Button>
              </div>
              <div className="flex gap-x-5 mt-5">
                <div>
                  {product?.images && (
                    <Image
                      width={100}
                      height={100}
                      src={activeImage || product.thumbnail}
                      alt={product.title}
                      className="object-contain h-[250px] w-full shrink-0 "
                    />
                  )}
                </div>

                <div className="w-full space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-700">
                      {product?.title}{" "}
                      <span className="text-sm font-medium text-gray-700">
                        {product?.category}
                      </span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 text-justify">
                    {product?.description}
                  </p>
                  <div className="bg-yellow-300  h-8 w-fit rounded-[10px] flex items-center justify-center px-2">
                    <p className="text-yellow-600 text-sm font-bold font-sans ">
                      {product.sku}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>${product?.price}</p>
                    <div className="flex justify-between items-center">
                      <Rating
                        className="text-primary"
                        value={product?.rating}
                        disabled
                        cancel={false}
                      />
                      <p>{product?.reviews?.length} Reviews</p>
                    </div>
                  </div>

                  {product && (
                    <div className="flex justify-between items-center gap-x-6 mt-4">
                      {existingItem?.id === product.id && (
                        <div className="flex items-center gap-x-2">
                          <Button
                            onClick={(e: { stopPropagation: () => void }) => {
                              e.stopPropagation();
                              dispatch(decreaseQuantity({ id: product.id }));
                            }}
                            className="!bg-primary text-white !w-4 !h-4 !rounded-[3px] text-[10px]"
                          >
                            <i className=" pi pi-minus "></i>
                          </Button>
                          <p>{existingItem.quantity}</p>
                          <Button
                            onClick={(e: { stopPropagation: () => void }) => {
                              e.stopPropagation();
                              dispatch(increaseQuantity({ id: product.id }));
                            }}
                            className="!bg-primary text-white !w-4 !h-4  !rounded-[3px]  text-[10px]"
                          >
                            <i className=" pi pi-plus"></i>
                          </Button>
                        </div>
                      )}

                      {existingItem?.id === product.id ? (
                        <Button
                          onClick={(e: { stopPropagation: () => void }) => {
                            e.stopPropagation();
                            dispatch(removeFromCart({ id: product.id }));
                          }}
                          className="!w-20 !bg-transparent text-red-600"
                        >
                          <i className="pi pi-trash"></i> Remove
                        </Button>
                      ) : (
                        <Button
                          className="bg-[#7765C4] text-white shadow-sm ml-auto"
                          onClick={(e: { stopPropagation: () => void }) => {
                            e.stopPropagation();
                            dispatch(
                              addToCart({
                                ...product,
                                quantity: 1,
                              })
                            );
                          }}
                        >
                          <i
                            className="pi
          pi-shopping-cart"
                          ></i>{" "}
                          Add to cart
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex border-t my-4">
              {product.images.map((image, index) => (
                <div onClick={() => setActiveImage(image)} key={index}>
                  <Image
                    height={100}
                    width={100}
                    src={image}
                    quality={100}
                    alt={product.title}
                    className="object-contain h-[100px] w-[100px] shrink-0 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Modal;
