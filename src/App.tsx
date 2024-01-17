import "./App.css";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";

function App() {
  return (
    <AuthProvider>
      <div data-testid="app-component">
        <Outlet />
      </div>
    </AuthProvider>
  );
}

export default App;
