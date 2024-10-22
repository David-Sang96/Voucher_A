import { FaLockOpen } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import useUserStore from "../store/useUserStore";

const Profile = () => {
  // const user = getCookie("auth_user");
  const { name, email, profile_image } =
    useUserStore((state) => state.user) || {};

  return (
    <section>
      <Breadcrumb currentPageTitle="Profile" />

      <div className="mx-auto mt-5 max-w-lg space-y-4 p-7 shadow-lg">
        <div className="flex items-end space-x-4">
          <div className="relative">
            <img
              className="size-32 rounded-lg"
              src={
                profile_image ??
                "https://iidamidamerica.org/wp-content/uploads/2020/12/male-placeholder-image.jpeg"
              }
              alt="Helene avatar"
            />
            <Link
              to={"change-image"}
              className="absolute -right-2 -top-3 rounded-full bg-blue-600 p-1 text-white hover:bg-blue-500"
            >
              <MdModeEditOutline className="size-3" />
            </Link>
          </div>
          <div>
            <div className="text-primary-800 dark:text-primary-300 flex items-center gap-2 rounded py-0.5 text-xs font-medium dark:bg-blue-900">
              Your Name
              <Link
                to={"change-name"}
                className="rounded-full bg-blue-600 p-1 text-white hover:bg-blue-500"
              >
                <MdModeEditOutline className="size-3" />
              </Link>
            </div>
            <h2 className="flex items-center font-bold leading-none text-gray-900 dark:text-white sm:text-xl">
              {name}
            </h2>
          </div>
        </div>
        <dl>
          <dt className="font-semibold text-gray-900 dark:text-white">
            Email Address
          </dt>
          <dd className="text-gray-500 dark:text-gray-400">{email}</dd>
        </dl>
        <button
          type="button"
          className="mb-2 me-2 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FaLockOpen />
          Change Password
        </button>
      </div>
    </section>
  );
};

export default Profile;
