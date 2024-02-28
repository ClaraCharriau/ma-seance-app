import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from '../component/home-page/Home';
import Profile from '../component/profile-page/Profile';
import TheaterDetailsLayout from '../component/theater-details-page/TheaterDetailsLayout';
import Error from '../component/error-page/Error';
import Login from '../component/login-page/Login';
import FavTheaters from '../component/fav-theaters-page/FavTheaterPage';
import { appLoader } from './loaders/AppLoader';
import { theaterLoader } from './loaders/TheaterLoader';
import AppLayout from './AppLayout';
import MovieDetails from '../component/movie-details-page/MovieDetails';
import { movieLoader } from './loaders/MovieLoader';
import Currently from '../component/currently-page/Currently';
import Spinner from '../component/common/spinner/Spinner';
import MovieShowtimes from '../component/theater-details-page/movie-showtimes/MovieShowtimes';
import { movieScreeningsLoader } from './loaders/MovieScreeningsLoader';

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
                    element: <Currently />
                },
                {
                    path: '/agenda',
                    element: <>Agenda</>
                },
                {
                    path: '/movies/:id',
                    loader: movieLoader,
                    element: <MovieDetails />,
                    errorElement: <Error />
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
                    loader: theaterLoader,
                    element: <TheaterDetailsLayout />,
                    children: [
                        {
                            path: '/theaters/:theaterId/:date?',
                            loader: movieScreeningsLoader,
                            element: <MovieShowtimes />
                        }
                    ]
                },
                {
                    path: '/fav-theaters',
                    element: <FavTheaters />
                },
                {
                    path: '/watchlist',
                    element: <>Watchlist</>
                }
            ]
        }
    ]);
    return <RouterProvider router={router} fallbackElement={<Spinner />} />;
};

export default AppRouter;
