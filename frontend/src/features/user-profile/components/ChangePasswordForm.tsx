import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import { removeCookie } from "react-use-cookie";
import { updatePassword } from "../../../services/userProfile";
import useUserStore from "../../../store/useUserStore";

export interface PasswordTypes {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
}

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<PasswordTypes>();
  const { removeUser } = useUserStore();

  const handleLogin: SubmitHandler<PasswordTypes> = async (data) => {
    const res = await updatePassword(data);
    const resData = await res.json();
    if (res.status === 200) {
      toast.success(resData.message + ".Please log in again!");
      removeCookie("token");
      removeCookie("auth_user");
      removeUser();
    } else {
      toast.error(resData.message);
    }
  };

  const newPassword = watch("new_password");

  return (
    <form
      className="mx-auto max-w-md space-y-4 p-5 shadow-lg md:space-y-6"
      onSubmit={handleSubmit(handleLogin)}
    >
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
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.old_password && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
          {...register("old_password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
        {errors.old_password && (
          <p className="text-xs font-bold text-red-500">
            {errors.old_password.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="new_password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          New Password
        </label>
        <input
          type="password"
          id="new_password"
          placeholder="••••••••"
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.new_password && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
          {...register("new_password", {
            required: "New password is required",
            minLength: {
              value: 8,
              message: "New password must be at least 8 characters long",
            },
          })}
        />
        {errors.new_password && (
          <p className="text-xs font-bold text-red-500">
            {errors.new_password.message}
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
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.new_password_confirmation && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
          {...register("new_password_confirmation", {
            required: "Confirm password is required",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          })}
        />
        {errors.new_password_confirmation && (
          <p className="text-xs font-bold text-red-500">
            {errors.new_password_confirmation.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:pointer-events-none disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:inline-flex sm:items-center sm:justify-center sm:gap-1"
        disabled={isSubmitting}
      >
        <span> Update </span>
        {isSubmitting && <ImSpinner3 className="size-4 animate-spin" />}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
