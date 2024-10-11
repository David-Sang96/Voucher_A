import { useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import useSaleRecordStore from "../store/useSaleRecordStore";

const SaleTable = () => {
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const {
    records: products,
    deleteRecord,
    addQuantity,
    removeQuantity,
  } = useSaleRecordStore();
  const total = products.reduce((a, c) => a + c.cost, 0);
  const tax = total * 0.05;
  const netTotal = total + tax;

  const handleDelete = (id: number, name: string) => {
    deleteRecord(id);
    toast.success(`${name} deleted`);
  };

  return (
    <div className="relative mt-6 overflow-x-auto overflow-y-hidden shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              product name
            </th>
            <th scope="col" className="px-6 py-3">
              price
            </th>
            <th scope="col" className="px-6 py-3">
              quantity
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="text-center">cost</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="text-end">Action</div>
            </th>
          </tr>
        </thead>
        {!!products.length &&
          products.map((product) => (
            <tbody key={product.id}>
              <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                <td className="px-6 py-4">{product.id}</td>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {product.name?.slice(0, 18)}..
                </th>
                <td className="px-6 py-4">{product.price}</td>
                <td
                  className="relative"
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                >
                  <div className="flex items-center ps-12">
                    {hoveredProductId === product.id && (
                      <button
                        className="absolute left-5 rounded bg-gray-200 px-2 py-1"
                        onClick={() => removeQuantity(product.id)}
                      >
                        -
                      </button>
                    )}
                    <span className="mx-4">{product.quantity}</span>
                    {hoveredProductId === product.id && (
                      <button
                        className="absolute right-20 rounded bg-gray-200 px-2 py-1"
                        onClick={() => addQuantity(product.id, 1)}
                      >
                        +
                      </button>
                    )}
                  </div>
                </td>
                <td className="py-4 pe-5 ps-6 text-center">
                  {product.cost.toFixed(2)}
                </td>
                <td className="px-12 py-4 text-end">
                  <button
                    className="cursor-pointer text-red-500"
                    onClick={() => handleDelete(product.id, product.name)}
                  >
                    <MdDelete className="text-xl" />
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        {products.length === 0 && (
          <tbody className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <tr>
              <td className="py-3.5 text-center font-semibold" colSpan={6}>
                There is no record.Buy something
              </td>
            </tr>
          </tbody>
        )}

        <tbody>
          <tr>
            <td colSpan={5} className="py-5 pe-24 text-end font-semibold">
              Total
            </td>
            <td colSpan={1} className="pe-5 text-end">
              {total.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan={5} className="py-5 pe-24 text-end font-semibold">
              Tax (Vat 5%)
            </td>
            <td colSpan={1} className="pe-5 text-end">
              {tax.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan={5} className="py-5 pe-24 text-end font-semibold">
              Net Total (MYR)
            </td>
            <td colSpan={1} className="pe-5 text-end">
              {netTotal.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default SaleTable;