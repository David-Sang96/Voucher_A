/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ImSpinner3 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import useCookie, { getCookie } from "react-use-cookie";
import Breadcrumb from "../components/Breadcrumb";
import useUserStore from "../store/useUserStore";

type Value = {
  name: string;
};

const ChangeName = () => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Value>();
  const [userCookie, setUserCookie] = useCookie("auth_user");
  const token = getCookie("token");
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();

  const handleUpdateName: SubmitHandler<Value> = async (value) => {
    try {
      setIsUpdating(true);
      const res = await fetch(
        `${import.meta.env.VITE_AUTH_API_URL}/user-profile/change-name`,
        {
          method: "post",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(value),
        },
      );

      const resData = await res.json();

      if (res.status === 200) {
        setUserCookie(JSON.stringify(resData.user));
        setUser(resData.user);
        toast.success(resData.message);
        navigate("/dashboard/user-profile");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <Breadcrumb
        currentPageTitle="Update Name"
        links={[{ title: "Profile", path: "/dashboard/user-profile" }]}
      />
      <div className="mx-auto max-w-lg p-5 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Update Your Name</h2>
        <form onSubmit={handleSubmit(handleUpdateName)}>
          <div className="mb-3">
            <input
              type="text"
              defaultValue={user?.name}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500"}`}
              placeholder="eg.john doe"
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

          <button
            type="submit"
            className={`flex w-full items-center justify-center gap-1 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${isUpdating && "cursor-not-allowed bg-blue-400 hover:bg-blue-400"}`}
            disabled={isUpdating}
          >
            <span> Update </span>
            {isUpdating && <ImSpinner3 className="size-4 animate-spin" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeName;
