import './App.css';
import { AuthProvider } from './context/auth.context';
import AppRouter from './AppRouter';

function App() {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
}

export default App;
