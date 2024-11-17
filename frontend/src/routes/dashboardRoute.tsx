/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { productRoute } from "./productRoute";
import { saleRoute } from "./saleRoute";
import { voucherRoute } from "./voucherRoute";

const DashboardLayout = lazy(
  () => import("../features/dashboard/components/DashboardLayout"),
);
const DashboardPage = lazy(
  () => import("../features/dashboard/pages/DashboardPage"),
);

export const dashBoardRoute = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      ...productRoute,
      ...voucherRoute,
      ...saleRoute,
    ],
  },
];
