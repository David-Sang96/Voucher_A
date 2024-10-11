import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import useSaleRecordStore from "../store/useSaleRecordStore";
import axiosInstance from "../ultis/axios";
import { getUTCTime } from "../ultis/helperFn";

interface ProductType {
  name: string;
  id: number;
  price: number;
  createdAt: string;
}

interface IFormInput {
  id: number;
  quantity: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const SaleForm = () => {
  const { data: products, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/products`,
    fetcher,
  );
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const { addRecord, records, addQuantity } = useSaleRecordStore();

  const isExisted = records.map((item) => item.id);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (isExisted.includes(Number(data.id))) {
      addQuantity(Number(data.id), Number(data.quantity));
      reset();
      return;
    }

    const res = await axiosInstance.get(`/products/${data.id}`);
    const { id, name, price } = res.data;
    const createdAt = getUTCTime();
    const quantity = data.quantity;
    const cost = quantity * price;
    const newRecord = { id, name, price, quantity, cost, createdAt };
    addRecord(newRecord);
    reset();
  };

  if (isLoading)
    return <p className="font-semibold text-blue-300">Loading...</p>;

  return (
    <form
      className="mt-5 rounded-md p-2 shadow-md"
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
            {products.map((product: ProductType) => (
              <option key={product.id} value={product.id}>
                {product.name}
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
