import './App.css';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/auth.context';

function App() {
    return (
        <AuthProvider data-testid="app-component">
            <Outlet data-testid="outlet-component" />
        </AuthProvider>
    );
}

export default App;
