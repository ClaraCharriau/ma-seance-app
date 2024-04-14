import Toast from './component/common/toast/Toast';
import { AgendaProvider } from './context/agenda.context';
import { AuthProvider } from './context/auth.context';
import { FavoriteProvider } from './context/favorite.context';
import AppRouter from './router/AppRouter';

function App() {
    return (
        <>
            {/* TODO: remove after test in prod */}
            {console.log('Env : ', process.env.REACT_APP_ENV ? process.env.REACT_APP_ENV : process.env.NODE_ENV)}
            <AuthProvider>
                <FavoriteProvider>
                    <AgendaProvider>
                        <AppRouter />
                    </AgendaProvider>
                </FavoriteProvider>
            </AuthProvider>
            <Toast />
        </>
    );
}

export default App;
