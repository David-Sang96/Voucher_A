import { getCookie } from "react-use-cookie";
import { Value } from "../features/user-profile/components/ChangeNameForm";
import { PasswordTypes } from "../features/user-profile/components/ChangePasswordForm";

export const changUserName = (value: Value) => {
  return fetch(
    `${import.meta.env.VITE_AUTH_API_URL}/user-profile/change-name`,
    {
      method: "post",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify(value),
    },
  );
};

export const updateAvatar = (formData: FormData) => {
  return fetch(
    `${import.meta.env.VITE_AUTH_API_URL}/user-profile/change-profile-image`,
    {
      method: "post",
      headers: {
        // "content-type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: formData,
    },
  );
};

export const updatePassword = (value: PasswordTypes) => {
  return fetch(
    `${import.meta.env.VITE_AUTH_API_URL}/user-profile/change-password`,
    {
      method: "post",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify(value),
    },
  );
};
