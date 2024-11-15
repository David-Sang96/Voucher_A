import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import Container from "./components/Container.tsx";
import router from "./routes/router.tsx";
import "./styles/app.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Container>
      <RouterProvider router={router} />
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
        position: "top-right",
      }}
    />
  </StrictMode>,
);
