import { useState } from "react";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import SortThBtn from "../../../components/SortThBtn";
import TableSkeleton from "../../../components/TableSkeleton";
import { deleteVoucher } from "../../../services/voucher";
import VoucherTableRow from "./VoucherTableRow";

interface VoucherType {
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
  isLoading: boolean;
  sortBy: (val: string) => void;
}

const VoucherTable = ({ vouchers, isLoading, sortBy }: VoucherType) => {
  const [deletingVoucherId, setDeletingVoucherId] = useState<number | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  // const token = getCookie("token");
  const { mutate } = useSWRConfig();

  const handleDelete = async (id: number, name: string) => {
    try {
      setIsDeleting(true);
      setDeletingVoucherId(id);
      await deleteVoucher(id);

      mutate(`${import.meta.env.VITE_AUTH_API_URL}/vouchers`);
      toast.success(`${name} deleted`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unknown error occur");
      }
    } finally {
      setDeletingVoucherId(null);
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative overflow-x-auto overflow-y-hidden shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              <SortThBtn
                sortBy={sortBy}
                valOne="Voucher_Id Asc"
                valTwo="Voucher_Id Desc"
              >
                # ID
              </SortThBtn>
            </th>
            <th scope="col" className="px-6 py-3">
              <SortThBtn
                sortBy={sortBy}
                valOne="CusName (A To Z)"
                valTwo="CusName (Z To A)"
              >
                customer name
              </SortThBtn>
            </th>
            <th scope="col" className="px-6 py-3">
              <SortThBtn
                sortBy={sortBy}
                valOne="Tax (Low To High)"
                valTwo="Tax (High To Low)"
              >
                Tax
              </SortThBtn>
            </th>
            <th scope="col" className="px-6 py-3">
              <SortThBtn
                sortBy={sortBy}
                valOne="Total (Low To High)"
                valTwo="Total (High To Low)"
              >
                Total
              </SortThBtn>
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
            <td className="px-6 py-4 text-center font-semibold" colSpan={7}>
              No Vouchers
            </td>
          </tr>
        )}

        {isLoading ? (
          <TableSkeleton />
        ) : (
          <tbody>
            <VoucherTableRow
              vouchers={vouchers}
              isDeleting={isDeleting}
              handleDelete={handleDelete}
              deletingVoucherId={deletingVoucherId}
            />
          </tbody>
        )}
      </table>
    </div>
  );
};

export default VoucherTable;
