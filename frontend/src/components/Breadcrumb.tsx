import { IoHomeSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

type Props = {
  currentPageTitle: string;
  to?: string;
};

const Breadcrumb = ({ currentPageTitle }: Props) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            to={"/"}
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <IoHomeSharp />
            Home
          </Link>
        </li>

        <li aria-current="page">
          <div className="flex items-center">
            <MdOutlineKeyboardArrowRight className="text-xl" />
            <span className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">
              {currentPageTitle}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
