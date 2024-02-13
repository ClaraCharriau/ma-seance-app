import './App.css';
import { AuthProvider } from './context/auth.context';
import { FavoriteProvider } from './context/favorite.context';
import AppRouter from './router/AppRouter';

function App() {
    return (
        <AuthProvider>
            <FavoriteProvider>
                <AppRouter />
            </FavoriteProvider>
        </AuthProvider>
    );
}

export default App;
