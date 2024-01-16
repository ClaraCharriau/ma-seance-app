import './App.css';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div data-testid="app-component">
      <Outlet />
    </div >
  );
}

export default App;
