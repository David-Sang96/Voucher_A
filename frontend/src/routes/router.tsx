import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../features/public/components/PublicLayout";
import NotFound from "../pages/NotFound";
import { authRoute } from "./authRoute";
import { dashBoardRoute } from "./dashboardRoute";
import { publicRoute } from "./publicRoute";

const router = createBrowserRouter([
  {
    path: "",
    errorElement: <NotFound />,
    element: <PublicLayout />,
    children: publicRoute,
  },
  ...authRoute,
  ...dashBoardRoute,
]);
export default router;
