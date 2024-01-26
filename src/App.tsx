import './App.css';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/auth.context';
import Header from './component/common/header/Header';

function App() {
    return (
        <AuthProvider data-testid="app-component">
            <>
                {window.location.pathname !== '/login' && <Header />}
                <Outlet data-testid="outlet-component" />
            </>
        </AuthProvider>
    );
}

export default App;
