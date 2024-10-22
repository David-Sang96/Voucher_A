import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import App from "../App";
import DashBoard from "../pages/DashBoard";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Product from "../pages/Product";
import ProductCreate from "../pages/ProductCreate";
import ProductUpdate from "../pages/ProductUpdate";
import Register from "../pages/Register";
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
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/dashboard",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <DashBoard />,
            },
            {
              path: "products",
              element: <Product />,
            },
            {
              path: "product/create",
              element: <ProductCreate />,
            },
            {
              path: "product/update/:pid",
              element: <ProductUpdate />,
            },
            {
              path: "sales",
              element: <Sale />,
            },
            {
              path: "voucher",
              element: <Voucher />,
            },
            {
              path: "voucher/:vid",
              element: <VoucherDetail />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routers;
