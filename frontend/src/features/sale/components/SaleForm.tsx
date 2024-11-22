import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import { fetcher, getProducts } from "../../../services/sale";
import useSaleRecordStore from "../../../store/useSaleRecordStore";

interface ProductType {
  product_name: string;
  id: number;
  price: number;
}

interface IFormInput {
  id: number;
  quantity: number;
}

const SaleForm = () => {
  const { data, isLoading } = useSWR(
    `${import.meta.env.VITE_AUTH_API_URL}/products?limit=100`,
    fetcher,
  );
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const { addRecord, records, addQuantity } = useSaleRecordStore();

  const isExisted = records.map((item) => item.product_id);

  const onSubmit: SubmitHandler<IFormInput> = async (value) => {
    if (isExisted.includes(Number(value.id))) {
      addQuantity(Number(value.id), Number(value.quantity));
      reset();
      return;
    }

    const res = await getProducts(value.id);
    const { data: product } = await res.json();

    const quantity = value.quantity;
    const cost = quantity * product.price;

    const newRecord = {
      product_id: product.id,
      quantity,
      cost,
      product: { price: product.price, product_name: product.product_name },
      created_at: product.created_at,
    };
    addRecord(newRecord);
    reset();
  };

  if (isLoading) return <p className="font-semibold">Loading...</p>;

  return (
    <form
      className="rounded-md p-2 shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-2">
          <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Your Product
          </label>
          <select
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
            {...register("id")}
          >
            {data?.data?.map((product: ProductType) => (
              <option key={product.id} value={product.id}>
                {product.product_name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label className="mb-2 flex items-center gap-10 text-sm font-medium text-gray-900 dark:text-white">
            <p> Quantity</p>
            {errors.quantity?.type === "required" && (
              <span className="text-xs font-bold text-red-500">
                ( Quantity is required )
              </span>
            )}

            {errors.quantity?.type === "min" && (
              <span className="text-xs font-bold text-red-500">
                ( Quantity must be at least 1 )
              </span>
            )}
          </label>
          <input
            type="number"
            className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.quantity && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
            defaultValue={1}
            {...register("quantity", { required: true, min: 1 })}
          />
        </div>
        <div className="place-self-end">
          <button
            type="submit"
            className={`rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800`}
          >
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default SaleForm;
