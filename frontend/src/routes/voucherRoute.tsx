import { lazy } from "react";

const VoucherHomePage = lazy(
  () => import("../features/voucher/pages/VoucherHomePage"),
);
const VoucherDetailsPage = lazy(
  () => import("../features/voucher/pages/VoucherDetailsPage"),
);

export const voucherRoute = [
  {
    path: "vouchers",
    element: <VoucherHomePage />,
  },
  {
    path: "voucher/:vid",
    element: <VoucherDetailsPage />,
  },
];
