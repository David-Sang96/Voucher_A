import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import { registerAuth } from "../../../services/auth";

export interface RegisterType {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterType>();
  const navigate = useNavigate();
  const token = getCookie("token");

  const password = watch("password");

  const handleRegister: SubmitHandler<RegisterType> = async (data) => {
    const res = await registerAuth(data);
    const resData = await res.json();
    if (res.status === 200) {
      toast.success("Register successfully");
      reset();
      navigate("/login");
    } else {
      toast.error(resData.message);
    }
  };

  if (token) return <Navigate to={"/"} replace />;

  return (
    <form
      className="space-y-4 md:space-y-6"
      onSubmit={handleSubmit(handleRegister)}
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Name
        </label>
        <input
          type="text"
          id="name"
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
          placeholder="eg.John doe..."
          {...register("name", { required: true, minLength: 4 })}
        />
      </div>
      {errors.name?.type === "required" && (
        <span className="text-xs font-bold text-red-500">Name is required</span>
      )}
      {errors.name?.type === "minLength" && (
        <span className="text-xs font-bold text-red-500">
          Name must be at least 4 characters
        </span>
      )}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
          placeholder="eg.johndoe@gmail.com..."
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-xs font-bold text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.password && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
        {errors.password && (
          <p className="text-xs font-bold text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="confirm-password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm password
        </label>
        <input
          type="confirm-password"
          id="confirm-password"
          placeholder="••••••••"
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.password_confirmation && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
          {...register("password_confirmation", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors.password_confirmation && (
          <p className="text-xs font-bold text-red-500">
            {errors.password_confirmation.message}
          </p>
        )}
      </div>
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            id="terms"
            aria-describedby="terms"
            type="checkbox"
            className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            required
          />
        </div>

        <div className="ml-3 text-sm">
          <label
            htmlFor="terms"
            className="font-light text-gray-500 dark:text-gray-300"
          >
            I accept the{" "}
            <a
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              href="#"
            >
              Terms and Conditions
            </a>
          </label>
        </div>
      </div>
      <button
        type="submit"
        className={`w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:pointer-events-none disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:inline-flex sm:items-center sm:justify-center sm:gap-1`}
        disabled={isSubmitting}
      >
        <span> Create an account </span>
        {isSubmitting && <ImSpinner3 className="size-4 animate-spin" />}
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          to={"/login"}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
