import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Container from "./components/Container";
import Header from "./components/Header";

function App() {
  const location = useLocation();

  return (
    <main className="flex min-h-screen flex-col px-2 py-1">
      <Container>
        <Header />
        <SwitchTransition>
          <CSSTransition
            timeout={200}
            key={location.pathname}
            classNames={"fade"}
          >
            <div className="mt-4">
              <Outlet />
            </div>
          </CSSTransition>
        </SwitchTransition>
      </Container>
      <Toaster
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
            fontSize: "14px",
          },
          // Default options for specific types
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
        }}
      />
    </main>
  );
}

export default App;
