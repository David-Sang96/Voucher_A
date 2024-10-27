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
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  };
  updateFetchUrl: (val: string | null) => void;
};

const Pagination = ({
  meta: { to, total, from, links },
  updateFetchUrl,
}: Props) => {
  return (
    <div className="flex items-center justify-between">
      {/* Help text */}
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing {from} to {to} of {total} Entries
      </span>
      {/* Buttons */}
      <div className="mt-2 inline-flex">
        {links.map((link) => (
          <button
            key={link.label}
            className={`flex size-8 items-center justify-center border text-sm font-medium shadow-lg first:rounded-l-lg last:rounded-r-lg hover:bg-blue-500 hover:text-white disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${link.active ? "bg-blue-500 text-white" : ""}`}
            disabled={!link.url}
            onClick={() => updateFetchUrl(link.url)}
          >
            {link.label === "&laquo; Previous" ? (
              <HiArrowLeft />
            ) : link.label === "Next &raquo;" ? (
              <HiArrowRight />
            ) : (
              link.label
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
