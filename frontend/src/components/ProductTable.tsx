import { format } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSWRConfig } from "swr";
import axiosInstance from "../ultis/axios";
import TableSkeleton from "./TableSkeleton";

interface Props {
  products: {
    name: string;
    id: number;
    createdAt: string;
    updatedAt: string;
    price: number;
  }[];
  isLoading: boolean;
}

const ProductTable = ({ products, isLoading }: Props) => {
  const [deletingProductId, setDeletingProductId] = useState<number | null>(
    null,
  );
  const { mutate } = useSWRConfig();

  const handleDelete = async (id: number, name: string) => {
    setDeletingProductId(id);
    await axiosInstance.delete(`/products/${id}`);

    mutate(`${import.meta.env.VITE_API_URL}/products`);
    toast.success(`${name} deleted`);
  };

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
              <div className="text-center">Created At</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="text-end">Action</div>
            </th>
          </tr>
        </thead>
        {products?.length === 0 && (
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <td className="px-6 py-4 text-center font-semibold" colSpan={5}>
              No Products
            </td>
          </tr>
        )}
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <tbody>
            {products?.map((product) => (
              <tr
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                key={product.id}
              >
                <td className="px-6 py-4">{product.id}</td>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {product.name}
                </th>

                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4 text-center">
                  {format(
                    new Date(product.updatedAt || product.createdAt),
                    "d MMM yyyy - h:mm a",
                  )}
                </td>
                <td className="flex justify-end gap-6 px-6 py-4">
                  <Link
                    to={`/product/update/${product.id}`}
                    className="text-blue-500"
                  >
                    <RiEditLine className="text-xl" />
                  </Link>

                  <button
                    className="cursor-pointer text-red-500"
                    onClick={() => handleDelete(product.id, product.name)}
                  >
                    {deletingProductId === product.id ? (
                      <ImSpinner3 className="size-4 animate-spin" />
                    ) : (
                      <MdDelete className="text-xl" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ProductTable;
