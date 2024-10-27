/* eslint-disable @typescript-eslint/no-unused-vars */
import { debounce } from "lodash";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { TbFilterCancel } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import useSWR from "swr";
import ActionButton from "../components/ActionButton";
import Breadcrumb from "../components/Breadcrumb";
import Pagination from "../components/Pagination";
import VoucherTable from "../components/VoucherTable";

const Voucher = () => {
  const [fetchUrl, setFetchUrl] = useState<string | null>(
    `${import.meta.env.VITE_AUTH_API_URL}/vouchers`,
  );
  const token = getCookie("token");
  const [params, setParams] = useSearchParams();

  const fetcher = (url: string) =>
    fetch(url, { headers: { authorization: `Bearer ${token}` } }).then((res) =>
      res.json(),
    );

  const { data, isLoading } = useSWR(fetchUrl, fetcher);

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
    const currentUrl = new URL(url!);
    const searchParams = new URLSearchParams(currentUrl.search);
    const paramsKeys = Object.fromEntries(searchParams.entries());
    setParams(paramsKeys);
    setFetchUrl(url);
  };

  const sortById = (val: string) => {
    if (val === "asc") {
      setFetchUrl(
        `${import.meta.env.VITE_AUTH_API_URL}/vouchers?sort_by=id&sort_direction=asc`,
      );
      setParams({ sort_by: "id", sort_direction: "asc" });
    } else {
      setFetchUrl(
        `${import.meta.env.VITE_AUTH_API_URL}/vouchers?sort_by=id&sort_direction=desc`,
      );
      setParams({ sort_by: "id", sort_direction: "desc" });
    }
  };

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
          />
        </div>

        <ActionButton
          name=" Create Sale "
          icon={<TbFilterCancel className="text-lg" />}
          to="/dashboard/sales"
        />
      </div>
      <VoucherTable
        vouchers={data?.data}
        isLoading={isLoading}
        sortBy={sortById}
      />
      {!isLoading && (
        <Pagination
          updateFetchUrl={updateFetchUrl}
          links={data?.links}
          meta={data?.meta}
        />
      )}
    </section>
  );
};

export default Voucher;
