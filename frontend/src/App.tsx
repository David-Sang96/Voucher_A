import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Container from "./components/Container";

function App() {
  return (
    <main className="flex min-h-screen flex-col px-2 py-1">
      <Container>
        <div className="mt-4">
          <Outlet />
        </div>
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
