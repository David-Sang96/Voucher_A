import { Suspense, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import useCookie, { getCookie } from "react-use-cookie";

import Spinner from "../../../components/Spinner";
import useUserStore from "../../../store/useUserStore";
import Header from "./Header";

const DashboardLayout = () => {
  const token = getCookie("token");
  const [userCookie] = useCookie("auth_user");
  const location = useLocation();
  const { setUser } = useUserStore();

  useEffect(() => {
    setUser(JSON.parse(userCookie));
  }, [setUser, userCookie]);

  if (!token) return <Navigate to={"/"} replace />;

  return (
    <>
      <Header />
      <SwitchTransition>
        <CSSTransition
          timeout={200}
          key={location.pathname}
          classNames={"fade"}
        >
          <div className="mt-4">
            <Suspense fallback={<Spinner />}>
              <Outlet />
            </Suspense>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

export default DashboardLayout;
