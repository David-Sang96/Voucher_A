import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

type Props = {
  links: {
    prev: string | null;
    next: string | null;
  };
  meta: {
    total: number;
    from: number;
    to: number;
  };
  setFetchUrl: (val: string | null) => void;
};

const Pagination = ({
  links: { prev, next },
  meta: { to, total, from },
  setFetchUrl,
}: Props) => {
  return (
    <div className="flex items-center justify-between px-3">
      {/* Help text */}
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing {from} to {to} of {total} Entries
      </span>
      {/* Buttons */}
      <div className="xs:mt-0 mt-2 inline-flex gap-1">
        <button
          className="flex size-10 items-center justify-center rounded-s bg-gray-300 text-sm font-medium hover:bg-gray-400 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          disabled={!prev}
          onClick={() => setFetchUrl(prev)}
        >
          <HiArrowLeft />
        </button>
        <button
          className="flex size-10 items-center justify-center rounded-e border-0 border-s border-gray-200 bg-gray-300 text-sm font-medium hover:bg-gray-400 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          disabled={!next}
          onClick={() => setFetchUrl(next)}
        >
          <HiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
