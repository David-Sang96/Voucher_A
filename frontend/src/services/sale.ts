import { getCookie } from "react-use-cookie";

export const fetcher = (url: string) => {
  return fetch(url, {
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  }).then((res) => res.json());
};

export const getProducts = (value: number) => {
  return fetch(`${import.meta.env.VITE_AUTH_API_URL}/products/${value}`, {
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  });
};
