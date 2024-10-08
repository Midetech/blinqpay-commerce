"use client";
import { useQuery } from "@tanstack/react-query";
import Button from "components/Button";
import Card from "components/Card";
import Header from "components/Header";
import Modal from "components/Modal";
import SkeletonLoader from "components/SkeletonLoader";
import { Dropdown } from "primereact/dropdown";
import { Skeleton } from "primereact/skeleton";
import React, { useRef } from "react";
import { getMethod } from "services/request-methods";
import { Categories, Product, ResponseProps } from "../interfaces/interface";
import { useCart } from "./context/app-context";
import Footer from "components/Footer";
import { Toast } from "primereact/toast";

export default function Home() {
  const toast = useRef<Toast>(null);
  const { product } = useCart();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = React.useState<any>({} as any);
  const [apiResponse, setApiResponse] = React.useState<ResponseProps>(
    {} as any
  );
  const [categories, setCategories] = React.useState<Categories[]>([]);
  const [slug, setSlug] = React.useState<string>("");
  const [params, setParams] = React.useState<any>({
    limit: 20,
    skip: 0,
    page: 1,
  });
  const [selectedFilter, setSelectedFilter] = React.useState(null);

  const filterItems = [
    {
      name: "Name",
      code: "title",
    },
  ];
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
        params: params,
      },
    ],
    queryFn: getMethod,
  });

  React.useEffect(() => {
    setCategories(categoriesQuery.data || []);
  }, [categoriesQuery.isFetched, categoriesQuery.data]);

  React.useEffect(() => {
    setApiResponse(productQuery.data);
  }, [productQuery.isFetched, productQuery.data]);

  React.useEffect(() => {
    if (apiResponse?.products?.length > 0) {
      if ((params.sortBy && params.sortBy !== undefined) || params.q) {
        setProducts(apiResponse.products);
      } else {
        setProducts((prevProducts) => [
          ...prevProducts,
          ...apiResponse.products,
        ]);
      }
    }
  }, [apiResponse, params.sortBy, params.q]);

  return (
    <main className="flex lg:min-h-screen flex-col">
      <Toast ref={toast} />
      <Header
        handleSearch={(e) => {
          if (e.target.value) {
            setSlug("/search");
            setParams({
              ...params,
              q: e.target.value,
              order: null,
              limit: null,
              page: null,
              skip: null,
            });
          } else {
            setSlug("");
          }
        }}
        isSearchEnable
      />

      <div className="w-full lg:p-5 p-2 flex flex-col">
        <div className="flex  p-5 ">
          {categoriesQuery.isPending ? (
            <div className="flex justify-center gap-x-4 items-center">
              {[...Array(8)].map((item, index) => (
                <Skeleton key={index} width="5rem" className="mb-2"></Skeleton>
              ))}
            </div>
          ) : (
            <div className="w-full flex gap-x-5 overflow-auto mr-5">
              <button
                className="btn"
                onClick={() => {
                  setProducts([]);
                  setSlug("");
                  setSelectedFilter(null);
                  setParams({
                    ...params,
                    page: 1,
                    skip: 0,
                    sortBy: null,
                  });
                }}
              >
                All
              </button>
              {categories.map((item, index) => (
                <button
                  key={index}
                  className={`text-base text-nowrap hover:text-primary  ${
                    slug.includes(item.slug) ? "text-primary" : "text-gray-700"
                  }`}
                  onClick={() => {
                    setProducts([]);
                    setSlug(`/category/${item.slug}`);
                    setParams({
                      ...params,
                      page: 1,
                      skip: 0,
                      sortBy: null,
                    });
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
          <div className="card flex justify-end self-end ml-auto">
            <Dropdown
              disabled
              value={selectedFilter}
              onChange={(e) => {
                setSelectedFilter(e.value);
                setParams({
                  ...params,
                  sortBy: e.value?.code,
                });
              }}
              options={filterItems}
              optionLabel="name"
              placeholder="Sort"
              className="w-full md:w-14rem border"
              checkmark={true}
              highlightOnSelect={false}
              dropdownIcon={<i className="pi pi-sort-amount-down-alt"></i>}
              showClear
            />
          </div>
        </div>
        {productQuery.isPending && !products?.length && (
          <div className="flex flex-wrap gap-4">
            {[...Array(10)].map((item, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        )}
        {products?.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start md:justify-start">
            {products?.map((item, index) => (
              <Card
                toast={toast}
                key={index}
                item={item}
                setSelectedProduct={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </div>

      {params.page < apiResponse?.total / params.limit && (
        <Button
          className="bg-primary text-white mx-auto mt-8 lg:mb-20 md:mb-20 mb-16"
          onClick={() =>
            setParams({
              ...params,
              page: params.page + 1,
              skip: (params.page - 1) * 10,
            })
          }
        >
          Load More
        </Button>
      )}
      <Modal
        product={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
      <Footer />
    </main>
  );
}
