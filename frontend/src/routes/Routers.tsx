import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Layout from "../components/Layout";
import ChangeImage from "../pages/ChangeImage";
import ChangeName from "../pages/ChangeName";
import ChangePassword from "../pages/ChangePassword";

import DashboardPage from "../features/dashboard/pages/DashboardPage";

import NotFound from "../pages/NotFound";
import Product from "../pages/Product";
import ProductCreate from "../pages/ProductCreate";
import ProductUpdate from "../pages/ProductUpdate";
import Profile from "../pages/Profile";
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
          element: <h1>Hello</h1>,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/dashboard",
          element: <Layout />,
          children: [
            {
              index: true,
              element: <DashboardPage />,
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
            {
              path: "user-profile",
              children: [
                {
                  index: true,
                  element: <Profile />,
                },
                {
                  path: "change-name",
                  element: <ChangeName />,
                },
                {
                  path: "change-image",
                  element: <ChangeImage />,
                },
                {
                  path: "change-password",
                  element: <ChangePassword />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routers;
