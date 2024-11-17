import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  updateFetchUrl: (val: string) => void;
  url: string | null;
}

const PaginationBtn = ({ children, updateFetchUrl, url }: Props) => {
  return (
    <button
      className={`flex size-8 items-center justify-center border bg-white text-sm font-medium shadow-lg first:rounded-l-lg last:rounded-r-lg disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
      disabled={!url}
      onClick={() => updateFetchUrl(url as string)}
    >
      {children}
    </button>
  );
};

export default PaginationBtn;
