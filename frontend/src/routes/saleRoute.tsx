import { lazy } from "react";

const SaleHomePage = lazy(() => import("../features/sale/pages/SaleHomePage"));

export const saleRoute = [
  {
    path: "sales",
    element: <SaleHomePage />,
  },
];
