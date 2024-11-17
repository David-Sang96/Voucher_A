import { lazy } from "react";

const VoucherHomePage = lazy(
  () => import("../features/voucher/pages/VoucherHomePage"),
);
const VoucherUpdatePage = lazy(
  () => import("../features/voucher/pages/VoucherUpdatePage"),
);

export const voucherRoute = [
  {
    path: "vouchers",
    element: <VoucherHomePage />,
  },
  {
    path: "voucher/:vid",
    element: <VoucherUpdatePage />,
  },
];
