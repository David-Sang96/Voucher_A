import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
import PaginationBtn from "./PaginationBtn";

type Props = {
  links: {
    prev: string | null;
    next: string | null;
    first: string | null;
    last: string | null;
  };
  meta: {
    total: number;
    from: number;
    to: number;
    current_page: number;
    last_page: number;
    path: string;
  };
  updateFetchUrl: (val: string | null) => void;
};

const Pagination = ({
  meta: { to, total, from, current_page, last_page, path } = {
    to: 0,
    total: 0,
    from: 0,
    current_page: 0,
    last_page: 0,
    path: "",
  },
  links: { prev, next, first, last } = {
    prev: null,
    next: null,
    first: null,
    last: null,
  },
  updateFetchUrl,
}: Props) => {
  const [params, setParams] = useSearchParams();
  const currentLimit = params.get("limit") ?? 5;
  const pageLimits = [5, 10, 20, 50, 100];

  const handleRowLimitSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParams({ page: "1", limit: e.target.value });
    updateFetchUrl(`${path}?page=1&limit=${e.target.value}`);
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing <b>{from}</b> to <b>{to}</b> of <b>{total} </b>Entries
      </span>
      <div className="mt-2 flex items-center">
        <div className="flex items-center gap-2 pe-3">
          <label
            htmlFor="countries"
            className="block text-nowrap text-sm text-gray-700 dark:text-white"
          >
            Rows per page
          </label>
          <select
            onChange={handleRowLimitSelect}
            className="flex h-10 items-center justify-center rounded-lg border border-y border-gray-200 text-sm font-medium disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            value={currentLimit}
          >
            {pageLimits.map((limit, index) => (
              <option key={index} value={limit}>
                {limit}
              </option>
            ))}
          </select>
        </div>
        <span className="pe-3 text-sm text-gray-700 dark:text-gray-400">
          Page <b>{current_page} </b> of <b>{last_page}</b>
        </span>
        <div className="flex">
          <PaginationBtn url={prev} updateFetchUrl={updateFetchUrl}>
            <LuChevronLeft />
          </PaginationBtn>
          <PaginationBtn url={first} updateFetchUrl={updateFetchUrl}>
            <LuChevronsLeft />
          </PaginationBtn>
          <PaginationBtn url={last} updateFetchUrl={updateFetchUrl}>
            <LuChevronsRight />
          </PaginationBtn>
          <PaginationBtn url={next} updateFetchUrl={updateFetchUrl}>
            <LuChevronRight />
          </PaginationBtn>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
