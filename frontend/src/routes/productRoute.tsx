import { lazy } from "react";

const ProductCreatePage = lazy(
  () => import("../features/product/pages/ProductCreatePage"),
);
const ProductHomePage = lazy(
  () => import("../features/product/pages/ProductHomePage"),
);
const ProductUpdatePage = lazy(
  () => import("../features/product/pages/ProductUpdatePage"),
);

export const productRoute = [
  {
    path: "products",
    element: <ProductHomePage />,
  },
  {
    path: "product-create",
    element: <ProductCreatePage />,
  },
  {
    path: "product-update/:pid",
    element: <ProductUpdatePage />,
  },
];
