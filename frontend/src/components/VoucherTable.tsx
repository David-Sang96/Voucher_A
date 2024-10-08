import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const VoucherTable = () => {
  // Tracks the visibility of the menu
  const date = new Date(Date.now());

  return (
    <div className="relative overflow-x-auto overflow-y-hidden shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              voucher id.
            </th>
            <th scope="col" className="px-6 py-3">
              names
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="text-center">email</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="text-center">Date</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="text-end">Actions</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <td className="px-6 py-4">#14124</td>
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              David Sang
            </th>
            <td className="px-6 py-4 text-end">luainawl@gmail.com</td>
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

export default VoucherTable;
