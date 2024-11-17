import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { createProduct } from "../../../services/product";

export interface CreateTypes {
  product_name: string;
  price: number;
  isCorrect: boolean;
  id: number;
  backToProductLists: string;
}

const ProductCreateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateTypes>();
  const navigate = useNavigate();
  // const [token] = reactUseCookie("token");

  const onSubmit: SubmitHandler<CreateTypes> = async (data) => {
    try {
      await createProduct(data);
      if (data.backToProductLists) {
        navigate("/dashboard/products");
      }
      reset();
      toast.success("created successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

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
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.product_name && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
          placeholder="name..."
          {...register("product_name", {
            required: "Name is required",
            maxLength: { value: 20, message: "  Not more than 20 characters" },
            minLength: { value: 5, message: "Not less than 5 characters" },
          })}
        />
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
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.price && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
          placeholder="price..."
          {...register("price", {
            required: " Price is required",
            min: { value: 100, message: "Price must be at least 100" },
            max: { value: 10000, message: "Price must not be more than 10000" },
          })}
        />
        {errors.price && (
          <span className="text-xs font-bold text-red-500">
            {errors.price.message}
          </span>
        )}
      </div>
      <div className="mb-3 flex items-center">
        <input
          id="isCorrect"
          required
          type="checkbox"
          defaultValue=""
          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          {...register("isCorrect", { required: true })}
        />
        <label
          htmlFor="isCorrect"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Fields already fill up
        </label>
      </div>
      <div className="mb-3 flex items-center">
        <input
          id="isFilledUp"
          type="checkbox"
          defaultValue=""
          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          {...register("backToProductLists")}
        />
        <label
          htmlFor="isFilledUp"
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
        <span> Create </span>
        {isSubmitting && <ImSpinner3 className="size-4 animate-spin" />}
      </button>
    </form>
  );
};

export default ProductCreateForm;
