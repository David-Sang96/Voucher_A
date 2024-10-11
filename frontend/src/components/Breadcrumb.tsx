import { IoHomeSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

type Props = {
  currentPageTitle: string;
  links?: {
    title: string;
    path: string;
  }[];
};

const Breadcrumb = ({ currentPageTitle, links }: Props) => {
  return (
    <nav className="mb-5 flex" aria-label="Breadcrumb">
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
        {links &&
          links.map((link, i) => (
            <li className="inline-flex items-center" key={i}>
              <Link
                to={link.path}
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <MdOutlineKeyboardArrowRight className="text-xl" />
                {link.title}
              </Link>
            </li>
          ))}

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
