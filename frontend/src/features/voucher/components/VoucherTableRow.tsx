import { format } from "date-fns";
import Avatar from "react-avatar";
import { ImSpinner3 } from "react-icons/im";
import { LuArrowRightToLine, LuCalendar } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

interface Props {
  vouchers: {
    customer_name: string;
    id: number;
    voucher_id: number;
    sale_date: string;
    updated_at: string;
    created_at: string;
    customer_email: string;
    total: number;
    tax: number;
    net_total: number;
  }[];
  isDeleting: boolean;
  deletingVoucherId: number | null;
  handleDelete: (id: number, name: string) => void;
}

const VoucherTableRow = ({
  vouchers,
  isDeleting,
  handleDelete,
  deletingVoucherId,
}: Props) => {
  return (
    <>
      {vouchers?.map((voucher) => (
        <tr
          className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
          key={voucher.id}
        >
          <td className="px-6 py-4 text-gray-900 dark:text-white">
            {voucher.voucher_id}
            <span className="flex items-center gap-1 text-xs">
              <LuCalendar /> {voucher.sale_date}
            </span>
          </td>
          <td
            scope="row"
            className="flex items-center gap-3 whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            <div>
              <Avatar
                name={voucher.customer_name}
                round
                size="30"
                textSizeRatio={2}
              />
            </div>
            {voucher.customer_name}
          </td>
          <td className="px-6 py-4">{voucher.tax}</td>
          <td className="px-6 py-4">{voucher.total}</td>
          <td className="px-6 py-4 text-center">{voucher.customer_email}</td>
          <td className="px-6 py-4 text-center">
            {format(voucher.sale_date, "d MMM yyyy")} -
            {format(voucher.updated_at, " h:mm a")}
          </td>
          <td className="flex justify-end gap-3 px-6 py-4">
            <button
              className="cursor-pointer text-red-500"
              onClick={() => handleDelete(voucher.id, voucher.customer_name)}
            >
              {deletingVoucherId === voucher.id && isDeleting ? (
                <ImSpinner3 className="size-4 animate-spin" />
              ) : (
                <MdDelete className="text-xl" />
              )}
            </button>
            <Link
              to={`/dashboard/voucher/${voucher.id}`}
              className="text-blue-500"
            >
              <LuArrowRightToLine className="text-xl" />
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
};

export default VoucherTableRow;
