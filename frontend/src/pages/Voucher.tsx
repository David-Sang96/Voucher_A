import { debounce } from "lodash";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { TbFilterCancel } from "react-icons/tb";
import useSWR from "swr";
import ActionButton from "../components/ActionButton";
import Breadcrumb from "../components/Breadcrumb";
import Pagination from "../components/Pagination";
import VoucherTable from "../components/VoucherTable";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Voucher = () => {
  const [fetchUrl, setFetchUrl] = useState<string | null>(
    `${import.meta.env.VITE_API_URL}/vouchers`,
  );
  const { data, isLoading } = useSWR(fetchUrl, fetcher);

  const handleSearch = debounce(
    (e) =>
      setFetchUrl(
        `${import.meta.env.VITE_API_URL}/vouchers?q=${e.target.value}`,
      ),
    500,
  );

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
          to="/sales"
        />
      </div>
      <VoucherTable vouchers={data?.data} isLoading={isLoading} />
      {!isLoading && (
        <Pagination
          setFetchUrl={setFetchUrl}
          links={data?.links}
          meta={data?.meta}
        />
      )}
    </section>
  );
};

export default Voucher;
