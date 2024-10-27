import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { getCookie, removeCookie } from "react-use-cookie";
import Breadcrumb from "../components/Breadcrumb";
import useUserStore from "../store/useUserStore";

interface IFormInput {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
}

const ChangePassword = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const token = getCookie("token");
  const { removeUser } = useUserStore();

  const handleLogin: SubmitHandler<IFormInput> = async (value) => {
    const res = await fetch(
      `${import.meta.env.VITE_AUTH_API_URL}/user-profile/change-password`,
      {
        method: "post",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
      },
    );

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

  return (
    <div>
      <Breadcrumb
        currentPageTitle="Update Password"
        links={[{ title: "Profile", path: "/dashboard/user-profile" }]}
      />
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
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
            {...register("old_password", { required: true })}
          />
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
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
            {...register("new_password", { required: true })}
          />
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
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
            {...register("new_password_confirmation", { required: true })}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
