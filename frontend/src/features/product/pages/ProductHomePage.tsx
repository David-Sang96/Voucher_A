import { debounce } from "lodash";
import { useState } from "react";
import { IoAddSharp, IoSearchOutline } from "react-icons/io5";
import { useLocation, useSearchParams } from "react-router-dom";
import useSWR from "swr";
import Breadcrumb from "../../../components/Breadcrumb";
import CreateBtn from "../../../components/CreateBtn";
import Pagination from "../../../components/Pagination";
import { fetcher } from "../../../services/product";
import { sortByCategory } from "../../../ultils/sort";
import { urlToParamsObject } from "../../../ultils/url";
import Filter from "../components/Filter";
import ProductTable from "../components/ProductTable";

const ProductHomePage = () => {
  const location = useLocation();
  const [fetchUrl, setFetchUrl] = useState<string | null>(
    `${import.meta.env.VITE_AUTH_API_URL}/products${location.search}`,
  );
  const [params, setParams] = useSearchParams();
  const { isLoading, data } = useSWR(fetchUrl, fetcher);
  const [currentSearchValue] = useState(params.get("q"));

  const updateFetchUrl = (url: string | null) => {
    const paramsKeys = urlToParamsObject(url!);
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

  const sort = (val: string) =>
    sortByCategory(val, "products", setFetchUrl, setParams);

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
            defaultValue={currentSearchValue || ""}
          />
        </div>
        <div className="flex items-center gap-3">
          <Filter filterByNameAndPrice={sort} />
          <CreateBtn
            name=" Add new product "
            icon={<IoAddSharp className="text-lg" />}
            to="/dashboard/product-create"
          />
        </div>
      </div>
      <ProductTable products={data?.data} isLoading={isLoading} sortBy={sort} />
      <Pagination
        links={data?.links}
        meta={data?.meta}
        updateFetchUrl={updateFetchUrl}
      />
    </section>
  );
};

export default ProductHomePage;
