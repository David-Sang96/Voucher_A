import { debounce } from "lodash";
import { useRef, useState } from "react";
import { BsX } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { TbFilterCancel } from "react-icons/tb";
import useSWR from "swr";
import ActionButton from "../components/ActionButton";
import Breadcrumb from "../components/Breadcrumb";
import VoucherTable from "../components/VoucherTable";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Voucher = () => {
  const [search, setSearch] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);
  const { data, isLoading } = useSWR(
    search
      ? `${import.meta.env.VITE_API_URL}/vouchers?voucher_id_like=${search}`
      : `${import.meta.env.VITE_API_URL}/vouchers`,
    fetcher,
  );

  const handleSearch = debounce((e) => setSearch(e.target.value), 500);

  const handleClearSearch = () => {
    setSearch("");

    if (searchRef.current) {
      searchRef.current.value = "";
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
            ref={searchRef}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 ps-10 text-sm text-gray-900 focus:border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="search voucher id..."
            onChange={handleSearch}
          />
          {search && (
            <button
              className="absolute inset-y-0 end-2 flex items-center ps-3.5"
              onClick={handleClearSearch}
            >
              <BsX
                className="scale-100 text-2xl duration-300 active:scale-90"
                fill="red"
              />
            </button>
          )}
        </div>

        <ActionButton
          name=" Create Sale "
          icon={<TbFilterCancel className="text-lg" />}
          to="/sales"
        />
      </div>
      <VoucherTable vouchers={data} isLoading={isLoading} />
    </section>
  );
};

export default Voucher;
