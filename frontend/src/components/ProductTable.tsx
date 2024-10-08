import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const ProductTable = () => {
  const date = new Date(Date.now());

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="text-start">Price</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="text-end">Created At</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="text-end">Action</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="hidden border-b bg-white last:table-row dark:border-gray-700 dark:bg-gray-800">
            <td className="px-6 py-4 text-center font-semibold" colSpan={5}>
              No Products
            </td>
          </tr>
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <td className="px-6 py-4">1</td>
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              Microsoft Surface Pro
            </th>

            <td className="px-6 py-4">$1999</td>
            <td className="px-6 py-4 text-end">
              {format(date, "d MMM yyyy - h:mm a")}
            </td>
            <td className="flex justify-end gap-4 px-6 py-4">
              <Link to={""} className="text-blue-500">
                <RiEditLine className="text-xl" />
              </Link>

              <Link to={""} className="text-red-500">
                <MdDelete className="text-xl" />
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
