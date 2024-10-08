import { IoSearchOutline } from "react-icons/io5";

const SearchInput = () => {
  return (
    <div className="relative w-2/5">
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
        <IoSearchOutline className="text-xl" />
      </div>
      <input
        type="text"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2.5 ps-10 text-sm text-gray-900 focus:border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        placeholder="search product ..."
      />
    </div>
  );
};

export default SearchInput;
