import { format } from "date-fns";
import { ImSpinner3 } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import { Link } from "react-router-dom";

type Props = {
  products: {
    id: number;
    product_name: string;
    created_at: string;
    updated_at: string;
    price: number;
  }[];
  deletingProductId: number | null;
  handleDelete: (val: number) => void;
};

const ProductTableRow = ({
  products,
  deletingProductId,
  handleDelete,
}: Props) => {
  return (
    <>
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
            {product.product_name}
          </th>

          <td className="px-6 py-4">{product.price}</td>
          <td className="px-6 py-4 text-center">
            {format(new Date(product.created_at), "d MMM yyyy - h:mm a")}
          </td>
          <td className="px-6 py-4 text-center">
            {format(new Date(product.updated_at), "d MMM yyyy - h:mm a")}
          </td>
          <td className="flex justify-end gap-6 px-6 py-4">
            <Link
              to={`/dashboard/product-update/${product.id}`}
              className="text-blue-500"
            >
              <RiEditLine className="text-xl" />
            </Link>

            <button
              className="cursor-pointer text-red-500"
              onClick={() => handleDelete(product.id)}
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
    </>
  );
};

export default ProductTableRow;
