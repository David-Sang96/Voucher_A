import { getCookie } from "react-use-cookie";

import type { CreateTypes } from "../features/product/components/ProductCreateForm";
import type { UpdateTypes } from "../features/product/components/ProductUpdateForm";

export const fetcher = async (url: string) => {
  return fetch(url, {
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  }).then((res) => res.json());
};

export const createProduct = (data: CreateTypes) => {
  return fetch(`${import.meta.env.VITE_AUTH_API_URL}/products`, {
    method: "post",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({
      product_name: data.product_name,
      price: data.price,
    }),
  });
};

export const updateProduct = (data: UpdateTypes, pid: string) => {
  return fetch(`${import.meta.env.VITE_AUTH_API_URL}/products/${pid}`, {
    method: "put",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({
      product_name: data.product_name,
      price: data.price,
    }),
  });
};

export const deleteProduct = (id: number) => {
  return fetch(`${import.meta.env.VITE_AUTH_API_URL}/products/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
};
