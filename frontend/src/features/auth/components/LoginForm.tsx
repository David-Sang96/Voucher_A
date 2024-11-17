import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";
import { login } from "../../../services/auth";

export interface LoginType {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>();
  const [userToken, setUserToken] = useCookie("token");
  const [userCookie, setUserCookie] = useCookie("auth_user");
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<LoginType> = async (data) => {
    const res = await login(data);
    const resData = await res.json();
    if (res.status === 200) {
      toast.success("Login successfully");
      reset();
      setUserToken(resData.token, {
        path: "/",
        SameSite: "Strict",
        days: 1,
      });
      setUserCookie(JSON.stringify(resData.user), {
        path: "/",
        SameSite: "Strict",
        days: 1,
      });
      navigate("/dashboard");
    } else {
      toast.error(resData.message);
    }
  };

  if (userToken || userCookie) return <Navigate to={"/"} replace />;
  return (
    <form
      className="space-y-4 md:space-y-6"
      onSubmit={handleSubmit(handleLogin)}
    >
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
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="remember"
              className="text-gray-500 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
        </div>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Forgot password?
        </a>
      </div>
      <button
        type="submit"
        className={`w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:pointer-events-none disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:inline-flex sm:items-center sm:justify-center sm:gap-1`}
        disabled={isSubmitting}
      >
        <span> Sign in </span>
        {isSubmitting && <ImSpinner3 className="size-4 animate-spin" />}
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{" "}
        <Link
          to={"/register"}
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
