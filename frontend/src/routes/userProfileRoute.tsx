import { lazy } from "react";

const UserProfileHomePage = lazy(
  () => import("../features/user-profile/pages/UserProfileHomePage"),
);
const UserPasswordChangePage = lazy(
  () => import("../features/user-profile/pages/UserPasswordChangePage"),
);
const UserAvatarChangePage = lazy(
  () => import("../features/user-profile/pages/UserAvatarChangePage"),
);
const UserNameChangePage = lazy(
  () => import("../features/user-profile/pages/UserNameChangePage"),
);

export const userProfileRoute = [
  {
    path: "user-profile",
    children: [
      {
        index: true,
        element: <UserProfileHomePage />,
      },
      {
        path: "change-name",
        element: <UserNameChangePage />,
      },
      {
        path: "change-image",
        element: <UserAvatarChangePage />,
      },
      {
        path: "change-password",
        element: <UserPasswordChangePage />,
      },
    ],
  },
];
