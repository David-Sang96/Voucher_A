/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import ProgressBar from "../components/ProgressBar";

const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("../features/auth/pages/RegisterPage"));

export const authRoute = [
  {
    path: "login",
    element: (
      <Suspense fallback={<ProgressBar />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "register",
    element: (
      <Suspense fallback={<ProgressBar />}>
        <RegisterPage />
      </Suspense>
    ),
  },
];
