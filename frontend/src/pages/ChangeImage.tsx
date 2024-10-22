import { useRef } from "react";
import toast from "react-hot-toast";
import { HiCamera } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import useCookie, { getCookie } from "react-use-cookie";
import Breadcrumb from "../components/Breadcrumb";
import useUserStore from "../store/useUserStore";

const ChangeImage = () => {
  const [userCookie, setUserCookie] = useCookie("auth_user");
  const token = getCookie("token");
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpdateImage = async (event: FileList | null) => {
    let formData;
    if (event) {
      formData = new FormData();
      formData.append("profile_image", event[0]);
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_AUTH_API_URL}/user-profile/change-profile-image`,
        {
          method: "post",
          headers: {
            // "content-type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
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
        toast.error(error.message || "Failed to update image.");
      }
    }
  };

  const handleUploadImage = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <Breadcrumb
        currentPageTitle="Update Image"
        links={[{ title: "Profile", path: "/dashboard/user-profile" }]}
      />
      <div className="mx-auto max-w-sm p-5 shadow-md">
        <div className="relative">
          <img
            src={
              user?.profile_image ??
              "https://iidamidamerica.org/wp-content/uploads/2020/12/male-placeholder-image.jpeg"
            }
            alt="profile image"
            className="size-32 h-full w-full rounded-lg object-contain object-top"
          />
          <button
            onClick={handleUploadImage}
            className="absolute -bottom-3 right-0 w-fit rounded-full bg-blue-600 p-1"
          >
            <HiCamera className="size-7 text-white" />
          </button>
        </div>

        <div>
          <input
            accept="image/jpeg, image/png, image/jpg"
            className="hidden w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleUpdateImage(e.target.files)}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangeImage;
