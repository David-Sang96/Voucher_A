import ActionButton from "../components/ActionButton";
import Breadcrumb from "../components/Breadcrumb";
import ProductTable from "../components/ProductTable";

import { debounce } from "lodash";
import { useState } from "react";
import { IoAddSharp, IoSearchOutline } from "react-icons/io5";
import useCookie from "react-use-cookie";
import useSWR from "swr";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";

const Product = () => {
  const [fetchUrl, setFetchUrl] = useState<string | null>(
    `${import.meta.env.VITE_AUTH_API_URL}/products`,
  );
  const [token] = useCookie("token");

  const fetcher = (url: string) =>
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());

  const { isLoading, data } = useSWR(fetchUrl, fetcher);

  const handleSearch = debounce((e) => {
    setFetchUrl(
      `${import.meta.env.VITE_AUTH_API_URL}/products?q=${e.target.value}`,
    );
  }, 500);

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
          <Filter />
          <ActionButton
            name=" Add new product "
            icon={<IoAddSharp className="text-lg" />}
            to="/dashboard/product/create"
          />
        </div>
      </div>
      <ProductTable products={data?.data} isLoading={isLoading} />
      {!isLoading && (
        <Pagination
          links={data?.links}
          meta={data?.meta}
          setFetchUrl={setFetchUrl}
        />
      )}
    </section>
  );
};

export default Product;
