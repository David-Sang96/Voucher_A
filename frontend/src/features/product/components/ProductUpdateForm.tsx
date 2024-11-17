import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import { fetcher, updateProduct } from "../../../services/product";
import FormSkeleton from "./ProductFormSkeleton";

export interface UpdateTypes {
  product_name: string;
  price: number;
  isCorrect: boolean;
  id: number;
  backToProductLists: string;
}

type Props = {
  pid: string;
};

const ProductUpdateForm = ({ pid }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateTypes>();
  const navigate = useNavigate();
  // const [token] = reactUseCookie("token");
  const { mutate } = useSWRConfig();

  const { data: product, isLoading } = useSWR(
    `${import.meta.env.VITE_AUTH_API_URL}/products/${pid}`,
    fetcher,
  );

  const onSubmit: SubmitHandler<UpdateTypes> = async (data) => {
    try {
      await updateProduct(data, pid as string);
      if (data.backToProductLists) {
        navigate("/dashboard/products");
      }
      reset();
      toast.success("updated successfully");
      mutate(`${import.meta.env.VITE_AUTH_API_URL}/products/${pid}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  if (isLoading) return <FormSkeleton />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Product Name
        </label>
        <input
          type="text"
          defaultValue={product.data.product_name}
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.product_name && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
          placeholder="name..."
          {...register("product_name", {
            required: "Name is required",
            maxLength: 30,
            minLength: { value: 5, message: " Not less than 5 characters" },
          })}
        />

        {errors.product_name?.type === "maxLength" && (
          <span className="text-xs font-bold text-red-500">
            Not more than 30 characters
          </span>
        )}
        {errors.product_name && (
          <span className="text-xs font-bold text-red-500">
            {errors.product_name.message}
          </span>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Product Price
        </label>
        <input
          type="number"
          defaultValue={product.data.price}
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.price && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
          placeholder="price..."
          {...register("price", { required: true, min: 100, max: 10000 })}
        />
        {errors.price?.type === "required" && (
          <span className="text-xs font-bold text-red-500">
            Price is required
          </span>
        )}
        {errors.price?.type === "min" && (
          <span className="text-xs font-bold text-red-500">
            Price must be at least 100
          </span>
        )}
        {errors.price?.type === "max" && (
          <span className="text-xs font-bold text-red-500">
            Price must not be more than 10000
          </span>
        )}
      </div>
      <div className="mb-3 flex items-center">
        <input
          id="is_correct"
          required
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          {...register("isCorrect", { required: true })}
        />
        <label
          htmlFor="is_correct"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Fields already fill up
        </label>
      </div>
      <div className="mb-3 flex items-center">
        <input
          id="back_to_product"
          type="checkbox"
          defaultChecked
          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          {...register("backToProductLists")}
        />
        <label
          htmlFor="back_to_product"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Back to product list after saving
        </label>
      </div>

      <Link
        to={"/dashboard/products"}
        className="mb-2 me-2 w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 max-sm:block"
      >
        Cancel
      </Link>

      <button
        type="submit"
        className={`w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:pointer-events-none disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:inline-flex sm:w-auto sm:items-center sm:gap-1`}
        disabled={isSubmitting}
      >
        <span> Update</span>
        {isSubmitting && <ImSpinner3 className="size-4 animate-spin" />}
      </button>
    </form>
  );
};

export default ProductUpdateForm;
