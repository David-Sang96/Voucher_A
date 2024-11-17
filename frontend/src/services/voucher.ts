import html2pdf from "html2pdf.js";
import printJS from "print-js";
import { getCookie } from "react-use-cookie";
import type { CreateVoucherTypes } from "../features/voucher/components/UserInfoForm";
import type { Record } from "../store/useSaleRecordStore";
import type { UserType } from "../store/useUserStore";

interface VoucherCreateProps {
  records: Record[];
  user: UserType | null;
  total: number;
  tax: number;
  net_total: number;
  data: CreateVoucherTypes;
}

export const fetcher = (url: string) => {
  return fetch(url, {
    headers: { authorization: `Bearer ${getCookie("token")}` },
  }).then((res) => res.json());
};

export const createVoucher = ({
  data,
  records,
  user,
  tax,
  total,
  net_total,
}: VoucherCreateProps) => {
  return fetch(`${import.meta.env.VITE_AUTH_API_URL}/vouchers`, {
    method: "post",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({
      voucher_id: data.voucher_id,
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      sale_date: data.sale_date,
      records,
      total,
      tax,
      net_total,
      user_id: user?.id,
    }),
  });
};

export const deleteVoucher = (id: number) => {
  return fetch(`${import.meta.env.VITE_AUTH_API_URL}/vouchers/${id}`, {
    method: "delete",
    headers: {
      authorization: `Bearer ${getCookie("token")}`,
    },
  });
};

export const handlePrint = () => {
  printJS({
    printable: "printArea",
    type: "html",
    css: [
      "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
    ], // External CSS link
  });
};

export const handlePdf = (voucher_id: number) => {
  const element = document.getElementById("printArea");

  html2pdf()
    .from(element)
    .set({
      margin: 1,
      paddingBottom: 2,
      image: { type: "jpeg", quality: 0.98 },
      filename: `invoice_${voucher_id}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    })
    .save();
};
