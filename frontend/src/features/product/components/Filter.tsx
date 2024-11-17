import { useState } from "react";
import { FiFilter } from "react-icons/fi";

const data = [
  "Name (A To Z)",
  "Name (Z To A)",
  "Price (Low To High)",
  "Price (High To Low)",
];

interface Props {
  filterByNameAndPrice: (val: string) => void;
}

const Filter = ({ filterByNameAndPrice }: Props) => {
  const [show, setShow] = useState(false);
  const handleFilter = (val: string) => {
    filterByNameAndPrice(val);
    setShow(false);
  };

  return (
    <div className="relative">
      <button
        id="dropdownHoverButton"
        className="inline-flex items-center gap-1 rounded-lg bg-gray-200 px-5 py-2 text-center text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-300 dark:focus:ring-blue-800"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        Filter
        <FiFilter />
      </button>

      {/* Dropdown menu */}
      {show && (
        <div
          id="dropdownHover"
          className="absolute z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownHoverButton"
          >
            {data.map((item, i) => (
              <li key={i}>
                <button
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleFilter(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Filter;
