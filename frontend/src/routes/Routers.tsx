import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import DashBoard from "../pages/DashBoard";
import NotFound from "../pages/NotFound";
import Product from "../pages/Product";
import Sale from "../pages/Sale";
import Voucher from "../pages/Voucher";
import VoucherDetail from "../pages/VoucherDetail";

const Routers = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <DashBoard />,
        },
        {
          path: "/products",
          element: <Product />,
        },
        {
          path: "/sales",
          element: <Sale />,
        },
        {
          path: "/voucher",
          element: <Voucher />,
        },
        {
          path: "/voucher/:vid",
          element: <VoucherDetail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routers;
