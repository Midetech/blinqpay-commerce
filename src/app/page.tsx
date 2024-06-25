"use client";
import Card from "components/Card";
import Header from "components/Header";
import React from "react";
import { Product } from "../interfaces/interface";
import { useQuery } from "@tanstack/react-query";
import { getMethod } from "services/request-methods";
import SkeletonLoader from "components/SkeletonLoader";
import { useCart } from "./app-context";

export default function Home() {
  const {
    state,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCart();

  console.log(state);

  const [products, setProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [slug, setSlug] = React.useState<string>("");

  const categoriesQuery = useQuery({
    queryKey: [
      "categories",
      {
        route: `/products/categories`,
        params: {},
      },
    ],
    queryFn: getMethod,
  });

  const productQuery = useQuery({
    queryKey: [
      "products",
      {
        route: `products${slug}`,
        params: {},
      },
    ],
    queryFn: getMethod,
  });

  React.useEffect(() => {
    setCategories(categoriesQuery.data || []);
  }, [categoriesQuery.isFetched, categoriesQuery.data]);

  React.useEffect(() => {
    setProducts(productQuery.data || []);
  }, [productQuery.isFetched, productQuery.data]);

  const handleProductSearch = (e: any) => {
    const searchQuery = e.target.value;
    if (searchQuery.length > 0) {
      const filteredProducts = products.filter((item: Product) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      setProducts(productQuery.data);
    }
  };

  return (
    <main className="flex lg:min-h-screen flex-col">
      <Header handleSearch={handleProductSearch} isSearchEnable />

      <div className="w-full lg:p-5 p-2 flex flex-col">
        <div className="w-full flex gap-x-5 p-5 overflow-auto">
          <button className="btn" onClick={() => setSlug("")}>
            All
          </button>
          {categories.map((item, index) => (
            <button
              key={index}
              className="text-base"
              onClick={() => setSlug(`/category/${item}`)}
            >
              {item}
            </button>
          ))}

          <div className="self-end w-24 h-8 border flex items-center justify-between px-2 rounded-[4px] ml-auto">
            <i className="pi pi-filter"></i>
            <p>Filter</p>
          </div>
        </div>
        {productQuery.isPending && (
          <div className="flex flex-wrap gap-4">
            {[...Array(10)].map((item, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        )}
        {productQuery.isFetched && (
          <div className="flex flex-wrap gap-4">
            {products.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
