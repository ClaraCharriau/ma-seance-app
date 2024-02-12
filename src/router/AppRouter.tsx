import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from '../component/home-page/Home';
import Profile from '../component/profile-page/Profile';
import TheaterDetails from '../component/theater-details-page/TheaterDetails';
import Error from '../component/error-page/Error';
import Login from '../component/login-page/Login';
import FavTheaters from '../component/fav-theaters-page/FavTheaterPage';
import { appLoader } from './loaders/AppLoader';
import { theaterLoader } from './loaders/TheaterLoader';
import AppLayout from './AppLayout';

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: '/login',
            element: <Login />
        },
        {
            element: <AppLayout />,
            errorElement: <Error />,
            loader: appLoader,
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/currently',
                    element: <>Currently</>
                },
                {
                    path: '/agenda',
                    element: <>Agenda</>
                },
                {
                    path: '/movie',
                    element: <>Movie</>
                },
                {
                    path: '/profile',
                    element: <Profile />
                },
                {
                    path: '/screening',
                    element: <>Screening</>
                },
                {
                    path: '/search',
                    element: <>Search</>
                },
                {
                    path: '/theaters/:id',
                    loader: theaterLoader,
                    element: <TheaterDetails />,
                    errorElement: <Error />
                },
                {
                    path: '/fav-theaters',
                    element: <FavTheaters />
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
