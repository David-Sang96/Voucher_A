import { useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { HiCamera } from "react-icons/hi";
import { ImSpinner3 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import useCookie, { getCookie } from "react-use-cookie";
import Breadcrumb from "../components/Breadcrumb";
import useUserStore from "../store/useUserStore";

interface Value {
  profile_image: FileList;
}

const ChangeImage = () => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Value>();
  const [userCookie, setUserCookie] = useCookie("auth_user");
  const token = getCookie("token");
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpdateImage: SubmitHandler<Value> = async () => {
    let formData;

    if (fileInputRef.current?.files) {
      formData = new FormData();
      formData.append("profile_image", fileInputRef.current.files[0]);
    }

    try {
      setIsUpdating(true);
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
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <Breadcrumb
        currentPageTitle="Update Image"
        links={[{ title: "Profile", path: "/dashboard/user-profile" }]}
      />
      <div className="mx-auto max-w-sm p-5 shadow-md">
        <div className="relative mb-5">
          <img
            src={
              user?.profile_image ??
              "https://iidamidamerica.org/wp-content/uploads/2020/12/male-placeholder-image.jpeg"
            }
            alt="profile image"
            className="size-32 rounded-lg object-contain object-top"
          />
          <button
            onClick={handleUploadImage}
            className="absolute -bottom-2 left-24 w-fit rounded-full bg-blue-600 p-1"
          >
            <HiCamera className="size-4 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleUpdateImage)}>
          <div className="mb-3">
            <input
              accept="image/jpeg, image/png, image/jpg"
              className="hidden w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              ref={(e) => {
                register("profile_image", { required: true }).ref(e);
                fileInputRef.current = e;
              }}
              onChange={(e) => {
                if (e.target.files) {
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />

            {errors.profile_image?.type === "required" && (
              <span className="text-xs font-bold text-red-500">
                Image is required
              </span>
            )}
          </div>
          {preview && (
            <img
              src={preview}
              alt="Image Preview"
              className="mb-4 size-36 w-full object-contain object-top"
            />
          )}

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

export default ChangeImage;
