import { createBrowserRouter } from "react-router-dom";

import NotFound from "../components/NotFound";
import PublicLayout from "../features/public/components/PublicLayout";
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
