"use client";
import Card from "components/Card";
import Header from "components/Header";
import React from "react";
import { Product } from "../interfaces/interface";
import { useQuery } from "@tanstack/react-query";
import { getMethod } from "services/request-methods";
import SkeletonLoader from "components/SkeletonLoader";

export default function Home() {
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

  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <div className="w-full lg:p-5 p-2 flex flex-col">
        <div className="flex gap-x-5 p-5">
          <button className="btn" onClick={() => setSlug("")}>
            All
          </button>
          {categories.map((item) => (
            <button
              key={item}
              className="btn"
              onClick={() => setSlug(`/category/${item}`)}
            >
              {item}
            </button>
          ))}
        </div>
        {productQuery.isPending && (
          <div className="flex flex-wrap gap-4">
            {[...Array(10)].map((item) => (
              <SkeletonLoader key={item} />
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
