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
import MovieDetailsLayout from '../component/movie-details-page/MovieDetailsLayout';
import { movieLoader } from './loaders/MovieLoader';
import Currently from '../component/currently-page/Currently';
import Spinner from '../component/common/spinner/Spinner';
import MoviesScreeningsList from '../component/theater-details-page/movies-screenings-list/MoviesScreeningsList';
import { movieScreeningsLoader } from './loaders/MovieScreeningsLoader';
import { theaterScreeningsLoader } from './loaders/TheaterScreeningsLoader';
import TheaterScreeningsList from '../component/movie-details-page/theater-screenings-list/TheaterScreeningsList';

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
                    loader: movieLoader,
                    element: <MovieDetailsLayout />,
                    children: [
                        {
                            path: '/movies/:id/:day?',
                            loader: theaterScreeningsLoader,
                            element: <TheaterScreeningsList />
                        }
                    ]
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
                            path: '/theaters/:id/:day?',
                            loader: movieScreeningsLoader,
                            element: <MoviesScreeningsList />
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
