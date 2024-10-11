import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import axiosInstance from "../ultis/axios";

interface IFormInput {
  name: string;
  price: number;
  isCorrect: boolean;
  id: number;
  backToProductLists: string;
}

const ProductCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setIsLoading(true);
      await axiosInstance.post("/products", {
        name: data.name,
        price: data.price,
        createdAt: new Date().toISOString(),
      });

      if (data.backToProductLists) {
        navigate("/products");
      }
      reset();
      toast.success("Product created");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <Breadcrumb
        currentPageTitle="Product Create"
        links={[{ title: "products", path: "/products" }]}
      />
      <div className="rounded-md p-4 shadow-md md:w-3/5">
        <h1 className="font-semibold md:text-lg">Create New Product</h1>
        <p className="mb-7 mt-2 text-sm text-gray-500">
          Create a product and share it with your customers. Make sure to
          include all the important details!
        </p>
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
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
              placeholder="name..."
              {...register("name", {
                required: true,
                maxLength: 20,
                minLength: 3,
              })}
            />
            {errors.name?.type === "required" && (
              <span className="text-xs font-bold text-red-500">
                Name is required
              </span>
            )}
            {errors.name?.type === "maxLength" && (
              <span className="text-xs font-bold text-red-500">
                Not more than 20 characters
              </span>
            )}
            {errors.name?.type === "minLength" && (
              <span className="text-xs font-bold text-red-500">
                Not less than 3 characters
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
              id="isCorrect"
              type="checkbox"
              defaultValue=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              {...register("backToProductLists")}
            />
            <label
              htmlFor="isCorrect"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Back to product list after saving
            </label>
          </div>

          <Link
            to={"/products"}
            className="mb-2 me-2 w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 max-sm:block"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className={`w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:inline-flex sm:w-auto sm:items-center sm:gap-1 ${isLoading && "cursor-not-allowed bg-blue-400 hover:bg-blue-400"}`}
            disabled={isLoading}
          >
            <span> Create </span>
            {isLoading && <ImSpinner3 className="size-4 animate-spin" />}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProductCreate;
