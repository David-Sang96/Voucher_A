/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import Spinner from "../components/Spinner";

const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("../features/auth/pages/RegisterPage"));

export const authRoute = [
  {
    path: "login",
    element: (
      <Suspense fallback={<Spinner />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "register",
    element: (
      <Suspense fallback={<Spinner />}>
        <RegisterPage />
      </Suspense>
    ),
  },
];
