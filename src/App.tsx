import { AgendaProvider } from './context/agenda.context';
import { AuthProvider } from './context/auth.context';
import { FavoriteProvider } from './context/favorite.context';
import AppRouter from './router/AppRouter';

function App() {
    return (
        <AuthProvider>
            <FavoriteProvider>
                <AgendaProvider>
                    <AppRouter />
                </AgendaProvider>
            </FavoriteProvider>
        </AuthProvider>
    );
}

export default App;
