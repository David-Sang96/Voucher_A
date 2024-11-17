import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useSWRConfig } from "swr";
import SortThBtn from "../../../components/SortThBtn";
import TableSkeleton from "../../../components/TableSkeleton";
import { deleteProduct } from "../../../services/product";
import ProductTableRow from "./ProductTableRow";

interface ProductTypes {
  products: {
    id: number;
    product_name: string;
    created_at: string;
    updated_at: string;
    price: number;
  }[];
  isLoading: boolean;
  sortBy: (val: string) => void;
}

const ProductTable = ({ products, isLoading, sortBy }: ProductTypes) => {
  const [deletingProductId, setDeletingProductId] = useState<number | null>(
    null,
  );
  const { mutate } = useSWRConfig();
  // const [token] = reactUseCookie("token");

  const handleDelete = async (id: number) => {
    setDeletingProductId(id);
    const res = await deleteProduct(id);
    const data = await res.json();
    console.log(data);

    if (res.status === 200) {
      mutate(`${import.meta.env.VITE_AUTH_API_URL}/products`);
      toast.success(`${data.message} `);
    } else {
      toast.error(`${data.message} `);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              <SortThBtn sortBy={sortBy} valOne="asc" valTwo="desc">
                #
              </SortThBtn>
            </th>
            <th scope="col" className="px-6 py-3">
              <SortThBtn
                sortBy={sortBy}
                valOne="Name (A To Z)"
                valTwo="Name (Z To A)"
              >
                Product Name
              </SortThBtn>
            </th>
            <th scope="col" className="px-6 py-3">
              <SortThBtn
                sortBy={sortBy}
                valOne="Price (Low To High)"
                valTwo="Price (High To Low)"
              >
                <div className="text-start">Price</div>
              </SortThBtn>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="text-center">Created At</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="text-center">Updated At</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="text-end">Action</div>
            </th>
          </tr>
        </thead>
        {products?.length === 0 && (
          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <td className="px-6 py-4 text-center font-semibold" colSpan={6}>
              No Products .{" "}
              <Link
                to={"/dashboard/product-create"}
                className="hover:underline hover:underline-offset-4"
              >
                Add Product
              </Link>
            </td>
          </tr>
        )}
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <tbody>
            <ProductTableRow
              products={products}
              deletingProductId={deletingProductId}
              handleDelete={handleDelete}
            />
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ProductTable;
