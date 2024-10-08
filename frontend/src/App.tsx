import { Outlet } from "react-router-dom";
import Container from "./components/Container";
import Header from "./components/Header";

function App() {
  return (
    <main className="flex min-h-screen flex-col max-md:px-2 max-md:py-1">
      <Container>
        <Header />
        <div className="mt-4">
          <Outlet />
        </div>
      </Container>
    </main>
  );
}

export default App;
