/* eslint-disable @typescript-eslint/no-unused-vars */
import ActionButton from "../components/ActionButton";
import Breadcrumb from "../components/Breadcrumb";
import ProductTable from "../components/ProductTable";

import { debounce } from "lodash";
import { useState } from "react";
import { IoAddSharp, IoSearchOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import useCookie from "react-use-cookie";
import useSWR from "swr";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";

const Product = () => {
  const [fetchUrl, setFetchUrl] = useState<string | null>(
    `${import.meta.env.VITE_AUTH_API_URL}/products`,
  );
  const [token] = useCookie("token");
  const [params, setParams] = useSearchParams();

  const fetcher = (url: string) =>
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());

  const { isLoading, data } = useSWR(fetchUrl, fetcher);

  const updateFetchUrl = (url: string | null) => {
    const currentUrl = new URL(url!);
    const searchParams = new URLSearchParams(currentUrl.search);
    const paramsKeys = Object.fromEntries(searchParams.entries());
    setParams(paramsKeys);
    setFetchUrl(url);
  };

  const handleSearch = debounce((e) => {
    if (e.target.value) {
      setFetchUrl(
        `${import.meta.env.VITE_AUTH_API_URL}/products?q=${e.target.value}`,
      );
      // params.set("q", e.target.value);
      // setParams(params);
      setParams({ q: e.target.value });
    } else {
      setFetchUrl(`${import.meta.env.VITE_AUTH_API_URL}/products`);
      setParams({});
    }
  }, 500);

  const sortById = (val: string) => {
    if (val === "asc") {
      setFetchUrl(
        `${import.meta.env.VITE_AUTH_API_URL}/products?sort_by=id&sort_direction=asc`,
      );
      setParams({ sort_by: "id", sort_direction: "asc" });
    } else {
      setFetchUrl(
        `${import.meta.env.VITE_AUTH_API_URL}/products?sort_by=id&sort_direction=desc`,
      );
      setParams({ sort_by: "id", sort_direction: "desc" });
    }
  };

  const filterByNameAndPrice = (val: string) => {
    if (val === "ID (Ascending)") {
      setFetchUrl(
        `${import.meta.env.VITE_AUTH_API_URL}/products?sort_by=id&sort_direction=asc`,
      );
      setParams({ sort_by: "id", sort_direction: "asc" });
    } else if (val === "ID (Descending)") {
      setFetchUrl(
        `${import.meta.env.VITE_AUTH_API_URL}/products?sort_by=id&sort_direction=desc`,
      );
      setParams({ sort_by: "id", sort_direction: "desc" });
    } else if (val === "Price (Low To High)") {
      setFetchUrl(
        `${import.meta.env.VITE_AUTH_API_URL}/products?sort_by=price&sort_direction=asc`,
      );
      setParams({ sort_by: "price", sort_direction: "asc" });
    } else if (val === "Price (High To Low)") {
      setFetchUrl(
        `${import.meta.env.VITE_AUTH_API_URL}/products?sort_by=price&sort_direction=desc`,
      );
      setParams({ sort_by: "price", sort_direction: "desc" });
    }
  };

  return (
    <section>
      <Breadcrumb currentPageTitle="Products" />
      <div className="mb-3 flex items-center justify-between">
        <div className="relative w-2/5">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
            <IoSearchOutline className="text-xl" />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 ps-10 text-sm text-gray-900 focus:border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="search product ..."
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-3">
          <Filter filterByNameAndPrice={filterByNameAndPrice} />
          <ActionButton
            name=" Add new product "
            icon={<IoAddSharp className="text-lg" />}
            to="/dashboard/product/create"
          />
        </div>
      </div>
      <ProductTable
        products={data?.data}
        isLoading={isLoading}
        sortBy={sortById}
      />
      {!isLoading && (
        <Pagination
          links={data?.links}
          meta={data?.meta}
          updateFetchUrl={updateFetchUrl}
        />
      )}
    </section>
  );
};

export default Product;
