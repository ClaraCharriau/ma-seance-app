import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home, { homeLoader } from './pages/home/Home';
import Currently from './pages/currently/Currently';
import Agenda from './pages/agenda/Agenda';
import Movie from './pages/movie/Movie';
import Profile from './pages/profile/Profile';
import Screening from './pages/screening/Screening';
import Search from './pages/search/Search';
import Theater from './pages/theater/Theater';
import Error from './pages/error/Error';
import Login from './pages/login/Login';

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement: <Error />,
            children: [
                {
                    index: true,
                    element: <Home />,
                    loader: homeLoader
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/currently',
                    element: <Currently />
                },
                {
                    path: '/agenda',
                    element: <Agenda />
                },
                {
                    path: '/movie',
                    element: <Movie />
                },
                {
                    path: '/profile',
                    element: <Profile />
                },
                {
                    path: '/screening',
                    element: <Screening />
                },
                {
                    path: '/search',
                    element: <Search />
                },
                {
                    path: '/theater',
                    element: <Theater />
                },
                {
                    path: '/wishlist',
                    element: <>Wishlist</>
                }
            ]
        }
    ]);
    return <RouterProvider router={router} />;
};

export default AppRouter;
