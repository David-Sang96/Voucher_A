/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";

const AboutUsPage = lazy(() => import("../features/public/pages/AboutUsPage"));
const ContactUsPage = lazy(
  () => import("../features/public/pages/ContactUsPage"),
);
const HomePage = lazy(() => import("../features/public/pages/HomePage"));

export const publicRoute = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "about-us",
    element: <AboutUsPage />,
  },
  {
    path: "contact-us",
    element: <ContactUsPage />,
  },
];
