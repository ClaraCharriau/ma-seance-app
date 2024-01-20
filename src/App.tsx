import "./App.css";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";

function App() {
  return (
    <AuthProvider >
        <Outlet />
    </AuthProvider>
  );
}

export default App;
