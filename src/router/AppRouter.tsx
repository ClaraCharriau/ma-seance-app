import { Outlet, RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import Home from '../component/home-page/Home';
import Profile from '../component/profile-page/Profile';
import TheaterDetails from '../component/theater-details-page/TheaterDetails';
import Error from '../component/error-page/Error';
import Login from '../component/login-page/Login';
import Header from '../component/common/header/Header';
import Footer from '../component/common/footer/Footer';
import FavTheaters from '../component/fav-theaters-page/FavTheaterPage';

export const appLoader = async () => {
    const currentUser = localStorage.getItem('user');
    if (!currentUser) {
        return redirect('/login');
    }
    return null;
};

export const AppLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

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
                    element: <TheaterDetails />
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
