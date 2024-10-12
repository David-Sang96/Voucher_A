import { format } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import { LuArrowRightToLine } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import axiosInstance from "../ultis/axios";
import TableSkeleton from "./TableSkeleton";

interface VoucherType {
  name: string;
  id: number;
  voucher_id: number;
  sale_date: string;
  updatedAt: string;
  email: string;
  isLoading: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const VoucherTable = () => {
  const [deletingProductId, setDeletingProduct] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: vouchers, isLoading } = useSWR<VoucherType[]>(
    `${import.meta.env.VITE_API_URL}/vouchers`,
    fetcher,
  );

  const { mutate } = useSWRConfig();

  const handleDelete = async (id: number, name: string) => {
    try {
      setIsDeleting(true);
      setDeletingProduct(id);
      await axiosInstance.delete(`/vouchers/${id}`);
      mutate(`${import.meta.env.VITE_API_URL}/vouchers`);
      toast.success(`${name} deleted`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unknown error occur");
      }
    } finally {
      setDeletingProduct(null);
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative overflow-x-auto overflow-y-hidden shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              # voucher id
            </th>
            <th scope="col" className="px-6 py-3">
              customer name
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="text-center">email</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="text-center">Date</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="text-end">Action</div>
            </th>
          </tr>
        </thead>
        {vouchers?.length === 0 && (
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <td className="px-6 py-4 text-center font-semibold" colSpan={5}>
              No Vouchers
            </td>
          </tr>
        )}

        {isLoading ? (
          <TableSkeleton />
        ) : (
          <tbody>
            {vouchers?.map((voucher) => (
              <tr
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                key={voucher.id}
              >
                <td className="px-6 py-4">{voucher.voucher_id}</td>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {voucher.name}
                </th>
                <td className="px-6 py-4 text-center">{voucher.email}</td>
                <td className="px-6 py-4 text-center">
                  {format(voucher.sale_date, "d MMM yyyy - h:mm a")}
                </td>
                <td className="flex justify-end gap-3 px-6 py-4">
                  <button
                    className="cursor-pointer text-red-500"
                    onClick={() => handleDelete(voucher.id, voucher.name)}
                  >
                    {deletingProductId === voucher.id && isDeleting ? (
                      <ImSpinner3 className="size-4 animate-spin" />
                    ) : (
                      <MdDelete className="text-xl" />
                    )}
                  </button>
                  <Link to={`/voucher/${voucher.id}`} className="text-blue-500">
                    <LuArrowRightToLine className="text-xl" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default VoucherTable;
