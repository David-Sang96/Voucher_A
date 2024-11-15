import type { LoginType } from "../features/auth/components/LoginForm";
import type { RegisterType } from "../features/auth/components/RegisterForm";

export const login = (data: LoginType) => {
  return fetch(`${import.meta.env.VITE_AUTH_API_URL}/login`, {
    method: "post",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const registerAuth = (data: RegisterType) => {
  return fetch(`${import.meta.env.VITE_AUTH_API_URL}/register`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
};
