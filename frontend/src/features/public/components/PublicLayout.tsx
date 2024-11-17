import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import ProgressBar from "../../../components/ProgressBar";
import Footer from "./Footer";
import Header from "./Header";

const PublicLayout = () => {
  const location = useLocation();

  return (
    <main className="mx-auto flex min-h-screen max-w-screen-xl flex-col justify-between">
      <Header />
      <SwitchTransition>
        <CSSTransition
          timeout={200}
          key={location.pathname}
          classNames={"fade"}
        >
          <div className="flex-1 px-8">
            <Suspense fallback={<ProgressBar />}>
              <Outlet />
            </Suspense>
          </div>
        </CSSTransition>
      </SwitchTransition>
      <Footer />
    </main>
  );
};

export default PublicLayout;
