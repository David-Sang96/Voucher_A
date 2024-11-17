/* eslint-disable @typescript-eslint/no-unused-vars */
import { debounce } from "lodash";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { TbFilterCancel } from "react-icons/tb";
import { useLocation, useSearchParams } from "react-router-dom";
import useSWR from "swr";
import Breadcrumb from "../../../components/Breadcrumb";
import CreateBtn from "../../../components/CreateBtn";
import Pagination from "../../../components/Pagination";
import { fetcher } from "../../../services/voucher";
import { sortByCategory } from "../../../ultils/sort";
import { urlToParamsObject } from "../../../ultils/url";
import VoucherTable from "../components/VoucherTable";

const VoucherHomePage = () => {
  const location = useLocation();
  const [fetchUrl, setFetchUrl] = useState<string | null>(
    `${import.meta.env.VITE_AUTH_API_URL}/vouchers${location.search}`,
  );
  const [params, setParams] = useSearchParams();
  const { data, isLoading } = useSWR(fetchUrl, fetcher);
  const [currentSearchValue] = useState(params.get("q"));

  const handleSearch = debounce((e) => {
    if (e.target.value) {
      setFetchUrl(
        `${import.meta.env.VITE_AUTH_API_URL}/vouchers?q=${e.target.value}`,
      );
      setParams({ q: e.target.value });
    } else {
      setFetchUrl(`${import.meta.env.VITE_AUTH_API_URL}/vouchers`);
      setParams({});
    }
  }, 500);

  const updateFetchUrl = (url: string | null) => {
    const paramsKeys = urlToParamsObject(url!);
    setParams(paramsKeys);
    setFetchUrl(url);
  };

  const sort = (val: string) =>
    sortByCategory(val, "vouchers", setFetchUrl, setParams);

  return (
    <section>
      <Breadcrumb currentPageTitle="Vouchers" />
      <div className="mb-5 font-bold">Vouchers List</div>
      <div className="mb-3 mt-5 flex items-center justify-between">
        <div className="relative w-2/5">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
            <IoSearchOutline className="text-xl" />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 ps-10 text-sm text-gray-900 focus:border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="search voucher id..."
            onChange={handleSearch}
            defaultValue={currentSearchValue || ""}
          />
        </div>

        <CreateBtn
          name=" Create Sale "
          icon={<TbFilterCancel className="text-lg" />}
          to="/dashboard/sales"
        />
      </div>
      <VoucherTable vouchers={data?.data} isLoading={isLoading} sortBy={sort} />

      <Pagination
        updateFetchUrl={updateFetchUrl}
        links={data?.links}
        meta={data?.meta}
      />
    </section>
  );
};

export default VoucherHomePage;
